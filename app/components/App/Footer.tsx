import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import React from 'react';

interface Props {
  onResetCount: () => void
}

export default function Footer({ onResetCount }: Props): React.JSX.Element {
  return (
    <div
      style={{
        padding: '16px',
        background: '#1A1A1A',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTop: '1px solid #333',
      }}
    >
      <Button
        danger
        icon={<ReloadOutlined />}
        onClick={onResetCount}
        block
        size="large"
        style={{
          height: 50,
          fontWeight: 700,
          fontSize: 15,
          borderRadius: 14,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '-0.2px',
        }}
      >
        Reset All Counts
      </Button>
    </div>
  );
}