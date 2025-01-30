import { useEffect } from "react";

const BotpressChatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://YOUR_BOTPRESS_URL/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Ask me anything...",
        botId: "937df5a6-4a7e-4994-8a10-fa0916b4e18b", 
        host: "https://YOUR_BOTPRESS_URL",
        messagingUrl: "https://YOUR_BOTPRESS_URL",
        stylesheet: "https://YOUR_BOTPRESS_URL/assets/modules/channel-web/custom-style.css",
        showCloseButton: true,
        enableTranscriptDownload: true,
        showConversationsButton: true,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // The chatbot is injected directly, so no need for an extra UI element
};

export default BotpressChatbot;
