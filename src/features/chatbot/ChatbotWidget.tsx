import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ShieldCheck } from 'lucide-react';

import { endpoints } from '../../shared/api/endpoints';
import './chatbot.css';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Bonjour ! 👋 Je suis l\'Assistant IA Dynesis Tech.\nComment puis-je vous aider aujourd\'hui ? Posez-moi des questions sur nos tarifs, nos technologies ou nos offres blockchain & web.'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await endpoints.public.chatbot.send(userText);
      const botText = res.data?.data?.response || 'Désolé, une erreur est survenue.';

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Désolé, je ne peux pas répondre pour le moment. N\'hésitez pas à nous contacter directement sur la page [Contact](/contact).'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot-floating">
      {!isOpen && (
        <button
          type="button"
          className="chatbot-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le Chatbot IA Dynesis Tech"
        >
          <div className="chatbot-trigger__badge">
            <Bot size={16} />
          </div>
          <span>Assistant IA</span>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label="Chatbot IA Dynesis Tech">
          <header className="chatbot-header">
            <div className="chatbot-header__title">
              <div className="chatbot-header__avatar">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="chatbot-header__name">Assistant Dynesis</h3>
                <span className="chatbot-header__rgpd-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <ShieldCheck size={10} /> RGPD Conforme
                </span>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-header__close"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </header>

          <div className="chatbot-rgpd-banner">
            🔒 <strong>Sécurité RGPD</strong> : Aucune donnée personnelle n'est enregistrée. Vos échanges sont 100% anonymes.
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--bot" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                L'Assistant écrit...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Posez votre question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn" disabled={!input.trim() || loading} aria-label="Envoyer">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
