// src/pages/JitsiCallPage.tsx

import { useEffect, useRef, useState } from "react";

// Эта функция будет генерировать случайное имя для комнаты
const generateRoomName = () => {
  return `Aralchi-Consultation-${Math.random().toString(36).substr(2, 9)}`;
};

interface JitsiCallPageProps {
  displayName?: string;
}

const JitsiCallPage = ({ displayName = "Пациент" }: JitsiCallPageProps) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [inviteLink, setInviteLink] = useState(""); // Состояние для хранения ссылки
  const [isCopied, setIsCopied] = useState(false); // Состояние для обратной связи кнопки "Копировать"

  useEffect(() => {
    const jitsiScript = document.createElement("script");
    jitsiScript.src = "https://meet.jit.si/external_api.js";
    document.head.appendChild(jitsiScript);

    jitsiScript.onload = () => {
      if (!jitsiContainerRef.current) return;

      const roomName = generateRoomName();

      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: displayName,
        },
        // Мы можем оставить базовую конфигурацию, раз уж она не работает как надо
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
        },
      };

      // @ts-ignore - Jitsi API
      const api = new JitsiMeetExternalAPI("meet.jit.si", options);

      // --- ВОТ ГДЕ ПРОИСХОДИТ МАГИЯ ---
      // 1. Мы подписываемся на событие, когда пользователь вошел в комнату
      api.on("videoConferenceJoined", (event: any) => {
        // event.roomName содержит имя комнаты
        const link = `https://meet.jit.si/${event.roomName}`;
        setInviteLink(link); // 2. Сохраняем ссылку в нашем React-состоянии
      });

      return () => {
        api.dispose();
      };
    };
  }, [displayName]);

  // Функция для копирования ссылки в буфер обмена
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Сбросить состояние через 2 секунды
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Контейнер для Jitsi */}
      <div ref={jitsiContainerRef} style={{ width: "100%", height: "100%" }} />

      {/* --- НАШ СОБСТВЕННЫЙ ИНТЕРФЕЙС ДЛЯ ПРИГЛАШЕНИЯ --- */}
      {/* Он появится, как только мы получим ссылку */}
      {inviteLink && (
        <div
          style={{
            position: "absolute",
            bottom: "100px", // Располагаем над панелью Jitsi
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "10px 20px",
            borderRadius: "10px",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <span>Ссылка для приглашения:</span>
          <input
            type="text"
            value={inviteLink}
            readOnly
            style={{
              background: "#555",
              color: "white",
              border: "none",
              padding: "5px",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleCopyLink}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isCopied ? "Скопировано!" : "Копировать"}
          </button>
        </div>
      )}
    </div>
  );
};

export default JitsiCallPage;
