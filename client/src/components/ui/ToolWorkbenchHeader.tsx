import { Button } from '@headlessui/react';
import { ArrowLeftIcon, ShieldCheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ToolWorkbenchHeaderProps {
  title: string;
  description: string;
  onReset: () => void;
  resetLabel?: string;
  resetDisabled?: boolean;
  children?: ReactNode;
}

const ToolWorkbenchHeader = ({
  title,
  description,
  onReset,
  resetLabel = 'Clear all',
  resetDisabled = false,
  children,
}: ToolWorkbenchHeaderProps) => (
  <div className="mb-10 border-b border-brand pb-8 sm:mb-12 sm:pb-10">
    <Link
      to="/"
      className="brand-nav-link mb-6 inline-flex items-center gap-2"
    >
      <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
      Back to tools
    </Link>

    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-4xl">
        <div className="brand-eyebrow mb-3 flex items-center gap-2">
          <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
          Runs locally in your browser
        </div>
        <h1 className="text-4xl font-medium text-brand md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-brand-muted sm:text-lg">{description}</p>
      </div>

      <div
        role="toolbar"
        aria-label="Tool actions"
        className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:justify-end"
      >
        {children}
        <Button
          type="button"
          onClick={onReset}
          disabled={resetDisabled}
          className="brand-button-secondary min-h-11 px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <TrashIcon className="h-4 w-4" aria-hidden="true" />
          {resetLabel}
        </Button>
      </div>
    </div>
  </div>
);

export default ToolWorkbenchHeader;
