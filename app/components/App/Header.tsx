import { LocationNames } from '@/types';
import { Switch } from 'antd';
import { JSX } from 'react';

interface Props {
  isKitchen: boolean
  mode: LocationNames
  onModeChange: (value: boolean) => void
}

export default function Header({ mode, isKitchen, onModeChange }: Props): JSX.Element {
  return (
    <div
      style={{
        background: isKitchen
          ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
          : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        padding: '20px 20px 10px',
        transition: 'background 0.35s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.5px',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Stock Refill
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
            {isKitchen ? 'Count what is in the kitchen' : 'Record what you picked up'}
          </div>
        </div>

        {/* Mode toggle */}
        <label
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer', // Importante para o UX
          }}
        >
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
            {isKitchen ? '🍳 Kitchen' : '📦 Stock'}
          </span>
          <Switch
            checked={mode === 'stock'}
            onChange={onModeChange}
          />
        </label>
      </div>
    </div>
  );
}