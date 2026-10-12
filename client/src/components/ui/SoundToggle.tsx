import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { isSoundAvailable, isSoundEnabled, setSoundEnabled, subscribeToSound } from '../../utils/sound';

const SoundToggle = ({ mobile = false }: { mobile?: boolean }) => {
  const [enabled, setEnabled] = useState(isSoundEnabled);
  const [available, setAvailable] = useState(isSoundAvailable);

  useEffect(() => subscribeToSound(() => {
    setEnabled(isSoundEnabled());
    setAvailable(isSoundAvailable());
  }), []);

  const toggle = () => setSoundEnabled(!enabled);
  const Icon = enabled ? SpeakerWaveIcon : SpeakerXMarkIcon;

  if (mobile) {
    return (
      <button className="sound-row" type="button" data-sound-toggle aria-pressed={enabled} disabled={!available} onClick={toggle}>
        <span>Sound</span>
        <span>{available ? (enabled ? 'On' : 'Off') : 'Unavailable'}</span>
      </button>
    );
  }

  return (
    <button
      className="icon-btn"
      type="button"
      data-sound-toggle
      aria-label={`Sound ${enabled ? 'on' : 'off'}`}
      aria-pressed={enabled}
      disabled={!available}
      onClick={toggle}
    >
      <Icon aria-hidden="true" />
    </button>
  );
};

export default SoundToggle;
