"use client"
import { useEffect, useRef, useState } from "react";
import styles from "./LoginScreen.module.scss";
import Image from 'next/image'
import { loginWithPin } from "../actions/auth";
import manifest from "../manifest";
import { APP_ICONS, APP_NAME } from "../config/app";

const GoogleIcon = () => (
  <svg className={styles.googleIcon} viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

interface PinLoginScreenProps {
  pinLength?: number;
  /** Chamado quando o usuário completa o PIN. Dispare sua Server Action aqui. */
  onSubmit?: (pin: string) => void;
  onForgotPin?: () => void;
  /** Controlado por quem usa o componente (ex: useTransition/isPending). */
  isSubmitting?: boolean;
  /** Vem do lado de fora (ex: searchParams.error === "invalid"). */
  hasExternalError?: boolean;
}

export default function LoginScreen({
  pinLength = 4,
  onSubmit,
  onForgotPin,
  isSubmitting = false,
  hasExternalError = false,
}: PinLoginScreenProps) {
  const [pin, setPin] = useState("");
  const [hasError, setHasError] = useState(hasExternalError);
  const hasSubmittedRef = useRef(false);

  const appManifest = manifest();
  const appName = appManifest.name;
  const appIcon = appManifest.icons?.[0].src
  // const appIcon = '/public/icons/icon-192.png'

  console.log('appManifest', appManifest);

  const isLocked = isSubmitting;

  const handleKeyPress = (key: string) => {
    if (isLocked) return;

    if (key === "back") {
      setHasError(false);
      setPin((prev) => prev.slice(0, -1));
      return;
    }

    if (key === "" || pin.length >= pinLength) return;

    setHasError(false);
    const nextPin = pin + key;
    setPin(nextPin);

    if (nextPin.length === pinLength && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      onSubmit?.(nextPin);
      // Reseta a trava no próximo tick, caso o pai não navegue
      // (ex: erro tratado sem reload de página).
      setTimeout(() => {
        hasSubmittedRef.current = false;
      }, 0);
    }
  };

  const title = hasError
    ? "PIN incorreto"
    : isSubmitting
      ? "Verificando..."
      : "Digite seu PIN";

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div className={styles.brand}>
          {APP_ICONS ?
            <Image
              src={APP_ICONS.icon192}
              alt={`${APP_NAME} icon`}
              width={192}
              height={192}
            />
            :
            <span className={styles.brandMark} />
          }
        </div>

        <h1 className={styles.title}>{title}</h1>

        <div className={`${styles.dots} ${hasError ? styles.dotsError : ""}`}>
          {Array.from({ length: pinLength }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index < pin.length ? styles.dotFilled : ""}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.keypad}>
        {KEYS.map((key, index) => {
          if (key === "") {
            return <div key={`empty-${index}`} className={styles.keySpacer} />;
          }

          if (key === "back") {
            return (
              <button
                key={key}
                type="button"
                className={styles.keyBack}
                onClick={() => handleKeyPress(key)}
                disabled={isLocked || pin.length === 0}
                aria-label="Apagar"
              >
                <svg viewBox="0 0 24 24" className={styles.backIcon} aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3.6 12.6L17 17l-4-4-4 4-1.4-1.4 4-4-4-4L9 6.2l4 4 4-4 1.4 1.4-4 4z"
                  />
                </svg>
              </button>
            );
          }

          return (
            <button
              key={key}
              type="button"
              className={styles.key}
              onClick={() => handleKeyPress(key)}
              disabled={isLocked}
            >
              {key}
            </button>
          );
        })}
      </div>

      {onForgotPin && (
        <button
          type="button"
          className={styles.forgotButton}
          onClick={onForgotPin}
          disabled={isLocked}
        >
          Esqueceu o PIN?
        </button>
      )}
    </div>
  );
}