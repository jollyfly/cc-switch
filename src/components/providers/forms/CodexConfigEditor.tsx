import React, { useState } from "react";
import { CodexAuthSection, CodexConfigSection } from "./CodexConfigSections";
import { CodexCommonConfigModal } from "./CodexCommonConfigModal";

interface CodexConfigEditorProps {
  authValue: string;

  configValue: string;

  onAuthChange: (value: string) => void;

  onConfigChange: (value: string) => void;

  onAuthBlur?: () => void;

  useCommonConfig: boolean;

  onCommonConfigToggle: (checked: boolean) => void;

  commonConfigSnippet: string;

  onCommonConfigSnippetChange: (value: string) => boolean;

  onCommonConfigErrorClear: () => void;

  commonConfigError: string;

  authError: string;

  configError: string; // config.toml 错误提示

  /** 隐藏 auth.json 编辑器（如 Copilot 预设，认证由 OAuth 管理） */
  hideAuth?: boolean;

  onExtract?: () => void;

  isExtracting?: boolean;
}

const CodexConfigEditor: React.FC<CodexConfigEditorProps> = ({
  authValue,
  configValue,
  onAuthChange,
  onConfigChange,
  onAuthBlur,
  useCommonConfig,
  onCommonConfigToggle,
  commonConfigSnippet,
  onCommonConfigSnippetChange,
  onCommonConfigErrorClear,
  commonConfigError,
  authError,
  configError,
  hideAuth,
  onExtract,
  isExtracting,
}) => {
  const [isCommonConfigModalOpen, setIsCommonConfigModalOpen] = useState(false);

  const handleCloseCommonConfigModal = () => {
    onCommonConfigErrorClear();
    setIsCommonConfigModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Auth JSON Section */}
      {!hideAuth && (
        <CodexAuthSection
          value={authValue}
          onChange={onAuthChange}
          onBlur={onAuthBlur}
          error={authError}
        />
      )}

      {/* Config TOML Section */}
      <CodexConfigSection
        value={configValue}
        onChange={onConfigChange}
        useCommonConfig={useCommonConfig}
        onCommonConfigToggle={onCommonConfigToggle}
        onEditCommonConfig={() => setIsCommonConfigModalOpen(true)}
        commonConfigError={commonConfigError}
        configError={configError}
      />

      {/* Common Config Modal */}
      <CodexCommonConfigModal
        isOpen={isCommonConfigModalOpen}
        onClose={handleCloseCommonConfigModal}
        value={commonConfigSnippet}
        onSave={onCommonConfigSnippetChange}
        error={commonConfigError}
        onExtract={onExtract}
        isExtracting={isExtracting}
      />
    </div>
  );
};

export default CodexConfigEditor;
