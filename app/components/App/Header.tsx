import { Modes } from '@/types';
import { Segmented, Switch } from 'antd';
import { JSX } from 'react';
import Icon from '../Icon';
import { BsBoxSeamFill, BsClipboardCheckFill } from 'react-icons/bs';
import { FaKitchenSet } from 'react-icons/fa6';
import { capitalize } from '@/app/helpers/formatters';
import { getHeaderSubtitle, IAppAccent, MODE_COLORS } from '@/app/helpers/consts';

interface Props {
  mode: Modes
  accent: IAppAccent['gradient']
  onModeChange: (mode: Modes) => void
}

export default function Header({ mode, accent, onModeChange }: Props): JSX.Element {
  return (
    <div
      style={{
        background: accent,
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
            {getHeaderSubtitle(mode)}
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
          <Segmented
            shape="round"
            onChange={onModeChange}
            options={[
              { value: 'kitchen', icon: <Icon><FaKitchenSet color={MODE_COLORS.kitchen.accent} /></Icon> },
              { value: 'stock', icon: <Icon><BsBoxSeamFill color={MODE_COLORS.stock.accent} /></Icon> },
              { value: 'tasks', icon: <Icon><BsClipboardCheckFill color={MODE_COLORS.tasks.accent} /></Icon> },
            ]}
          />
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
            {capitalize(mode)}
          </span>
        </label>
      </div>
    </div>
  );
}