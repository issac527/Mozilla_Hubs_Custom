import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { ReactComponent as WandIcon } from "../icons/Wand.svg";
import { ReactComponent as AttachIcon } from "../icons/Attach.svg";
import { ReactComponent as ChatIcon } from "../icons/Chat.svg";
import { ReactComponent as SendIcon } from "../icons/Send.svg";
import { ReactComponent as ReactionIcon } from "../icons/Reaction.svg";
import { IconButton } from "../input/IconButton";
import { TextAreaInput } from "../input/TextAreaInput";
import { ToolbarButton } from "../input/ToolbarButton";
import { Popover } from "../popover/Popover";
import { EmojiPicker } from "./EmojiPicker";
import styles from "./ChatSidebar.scss";
import { formatMessageBody } from "../../utils/chat-message";
import { FormattedMessage, useIntl, defineMessages, FormattedRelativeTime } from "react-intl";

export function SpawnMessageButton(props) {
  return (
    <IconButton className={styles.chatInputIcon} {...props}>
      <WandIcon />
    </IconButton>
  );
}

export function SendMessageButton(props) {
  return (
    <IconButton className={styles.chatInputIcon} {...props}>
      <SendIcon />
    </IconButton>
  );
}

export function EmojiPickerPopoverButton({ onSelectEmoji }) {
  return (
    <Popover
      title=""
      content={props => (
        <EmojiPicker
          onSelect={emoji => {
            onSelectEmoji(emoji);
            // eslint-disable-next-line react/prop-types
            props.closePopover();
          }}
          {...props}
        />
      )}
      placement="top"
      offsetDistance={28}
    >
      {({ togglePopover, popoverVisible, triggerRef }) => (
        <IconButton ref={triggerRef} className={styles.chatInputIcon} selected={popoverVisible} onClick={togglePopover}>
          <ReactionIcon />
        </IconButton>
      )}
    </Popover>
  );
}

EmojiPickerPopoverButton.propTypes = {
  onSelectEmoji: PropTypes.func.isRequired
};

export function MessageAttachmentButton(props) {
  return (
    <>
      <IconButton as="label" className={styles.chatInputIcon}>
        <AttachIcon />
        <input type="file" {...props} />
      </IconButton>
    </>
  );
}

export function ChatInput(props) {
  const intl = useIntl();

  return (
    <div className={styles.chatInputContainer}>
      <TextAreaInput
        placeholder={intl.formatMessage({ id: "chat-sidebar.input.placeholder", defaultMessage: "메시지..." })}
        {...props}
      />
    </div>
  );
}

ChatInput.propTypes = {
  onSpawn: PropTypes.func
};

const enteredMessages = defineMessages({
  room: { id: "chat-sidebar.system-message.entered-room", defaultMessage: "{name}님이 방에 들어왔습니다." },
  lobby: { id: "chat-sidebar.system-message.entered-lobby", defaultMessage: "{name}님이 로비에 들어왔습니다." }
});

const joinedMessages = defineMessages({
  lobby: { id: "chat-sidebar.system-message.joined-lobby", defaultMessage: "{name}님이 로비에 입장했습니다." },
  room: { id: "chat-sidebar.system-message.joined-room", defaultMessage: "{name}님이 방에 입장했습니다." }
});

export const LogMessageType = {
  roomEntryRequired: "roomEntryRequired",
  flyModeDisabled: "flyModeDisabled",
  flyModeEnabled: "flyModeEnabled",
  unauthorizedSceneChange: "unauthorizedSceneChange",
  invalidSceneUrl: "invalidSceneUrl",
  unauthorizedRoomRename: "unauthorizedRoomRename",
  captureUnavailable: "captureUnavailable",
  captureStopped: "captureStopped",
  captureStarted: "captureStarted",
  captureAlreadyStopped: "captureAlreadyStopped",
  captureAlreadyRunning: "captureAlreadyRunning",
  positionalAudioEnabled: "positionalAudioEnabled",
  positionalAudioDisabled: "positionalAudioDisabled",
  setAudioNormalizationFactor: "setAudioNormalizationFactor",
  audioNormalizationDisabled: "audioNormalizationDisabled",
  audioNormalizationNaN: "audioNormalizationNaN",
  invalidAudioNormalizationRange: "invalidAudioNormalizationRange",
  audioSuspended: "audioSuspended",
  audioResumed: "audioResumed"
};

const logMessages = defineMessages({
  [LogMessageType.roomEntryRequired]: {
    id: "chat-sidebar.log-message.room-entry-required",
    defaultMessage: "명령을 사용하기 위해선 방으로 들어가야 합니다."
  },
  [LogMessageType.flyModeDisabled]: {
    id: "chat-sidebar.log-message.fly-mode-disabled",
    defaultMessage: "Fly Mode 비활성화"
  },
  [LogMessageType.flyModeEnabled]: {
    id: "chat-sidebar.log-message.fly-mode-enabled",
    defaultMessage: "Fly Mode 활성화"
  },
  [LogMessageType.unauthorizedSceneChange]: {
    id: "chat-sidebar.log-message.unauthorized-scene-change",
    defaultMessage: "Scene 변경 권한 없음"
  },
  [LogMessageType.invalidSceneUrl]: {
    id: "chat-sidebar.log-message.invalid-scene-url",
    defaultMessage: "해당 URL은 유효한 Scene 또는 GLB File을 가리키지 않음"
  },
  [LogMessageType.unauthorizedRoomRename]: {
    id: "chat-sidebar.log-message.unauthorized-room-rename",
    defaultMessage: "방 이름 변경 권한 없음"
  },
  [LogMessageType.captureUnavailable]: {
    id: "chat-sidebar.log-message.capture-unavailable",
    defaultMessage: "캡처를 사용할 수 없음."
  },
  [LogMessageType.captureStopped]: {
    id: "chat-sidebar.log-message.capture-stopped",
    defaultMessage: "캡처 중지"
  },
  [LogMessageType.captureStarted]: {
    id: "chat-sidebar.log-message.capture-started",
    defaultMessage: "캡처 시작"
  },
  [LogMessageType.captureAlreadyStopped]: {
    id: "chat-sidebar.log-message.capture-already-stopped",
    defaultMessage: "캡처 중지 중..."
  },
  [LogMessageType.captureAlreadyRunning]: {
    id: "chat-sidebar.log-message.capture-already-running",
    defaultMessage: "캡처 진행 중..."
  },
  [LogMessageType.positionalAudioEnabled]: {
    id: "chat-sidebar.log-message.positional-audio-enabled",
    defaultMessage: "Positional audio 활성화"
  },
  [LogMessageType.positionalAudioDisabled]: {
    id: "chat-sidebar.log-message.positional-audio-disabled",
    defaultMessage: "Positional audio 비활성화"
  },
  [LogMessageType.setAudioNormalizationFactor]: {
    id: "chat-sidebar.log-message.set-audio-normalization-factor",
    defaultMessage: "audioNormalization 값이 {factor}로 설정"
  },
  [LogMessageType.audioNormalizationDisabled]: {
    id: "chat-sidebar.log-message.audio-normalization-disabled",
    defaultMessage: "audioNormalization 비활성화"
  },
  [LogMessageType.audioNormalizationNaN]: {
    id: "chat-sidebar.log-message.audio-normalization-nan",
    defaultMessage: "올바른 숫자를 입력해 주세요.(audioNormalization 활성화)"
  },
  [LogMessageType.invalidAudioNormalizationRange]: {
    id: "chat-sidebar.log-message.invalid-audio-normalization-range",
    defaultMessage: "Audio 값은 기본적으로 0 ~ 255 사이의 값이 필요(권장 값 : 4)"
  },
  [LogMessageType.audioSuspended]: {
    id: "chat-sidebar.log-message.audio-suspended",
    defaultMessage: "소리가 음소거 되었습니다. 음소거를 해제하려면 아무 곳이나 클릭해주세요."
  },
  [LogMessageType.audioResumed]: {
    id: "chat-sidebar.log-message.audio-resumed",
    defaultMessage: "음소거가 해제되었습니다."
  }
});

// TODO: use react-intl's defineMessages to get proper extraction
export function formatSystemMessage(entry, intl) {
  switch (entry.type) {
    case "join":
      return intl.formatMessage(joinedMessages[entry.presence], { name: <b>{entry.name}</b> });
    case "entered":
      return intl.formatMessage(enteredMessages[entry.presence], { name: <b>{entry.name}</b> });
    case "leave":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.leave"
          defaultMessage="{name}님이 떠났습니다.."
          values={{ name: <b>{entry.name}</b> }}
        />
      );
    case "display_name_changed":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.name-change"
          defaultMessage="{oldName}님이 이름을 {newName}으로 변경했습니다."
          values={{ oldName: <b>{entry.oldName}</b>, newName: <b>{entry.newName}</b> }}
        />
      );
    case "scene_changed":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.scene-change"
          defaultMessage="{name} Scene을 {sceneName}으로 변경했습니다."
          values={{ name: <b>{entry.name}</b>, sceneName: <b>{entry.sceneName}</b> }}
        />
      );
    case "hub_name_changed":
      return (
        <FormattedMessage
          id="chat-sidebar.system-message.hub-name-change"
          defaultMessage="{name}님이 방 이름을 {hubName}으로 변경했습니다."
          values={{ name: <b>{entry.name}</b>, hubName: <b>{entry.hubName}</b> }}
        />
      );
    case "log":
      return intl.formatMessage(logMessages[entry.messageType], entry.props);
    default:
      return null;
  }
}

export function SystemMessage(props) {
  const intl = useIntl();

  return (
    <li className={classNames(styles.messageGroup, styles.systemMessage)}>
      <p className={styles.messageGroupLabel}>
        <i>{formatSystemMessage(props, intl)}</i>
        <span>
          <FormattedRelativeTime updateIntervalInSeconds={10} value={(props.timestamp - Date.now()) / 1000} />
        </span>
      </p>
    </li>
  );
}

SystemMessage.propTypes = {
  timestamp: PropTypes.any
};

function MessageBubble({ media, monospace, emoji, children }) {
  return (
    <div
      className={classNames(styles.messageBubble, {
        [styles.media]: media,
        [styles.emoji]: emoji,
        [styles.monospace]: monospace
      })}
    >
      {children}
    </div>
  );
}

MessageBubble.propTypes = {
  media: PropTypes.bool,
  monospace: PropTypes.bool,
  emoji: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  children: PropTypes.node
};

function getMessageComponent(message) {
  switch (message.type) {
    case "chat": {
      const { formattedBody, monospace, emoji } = formatMessageBody(message.body);
      return (
        <MessageBubble key={message.id} monospace={monospace} emoji={emoji}>
          {formattedBody}
        </MessageBubble>
      );
    }
    case "video":
      return (
        <MessageBubble key={message.id} media>
          <video controls src={message.body.src} />
        </MessageBubble>
      );
    case "image":
    case "photo":
      return (
        <MessageBubble key={message.id} media>
          <img src={message.body.src} />
        </MessageBubble>
      );
    default:
      return null;
  }
}

export function ChatMessageGroup({ sent, sender, timestamp, messages }) {
  return (
    <li className={classNames(styles.messageGroup, { [styles.sent]: sent })}>
      <p className={styles.messageGroupLabel}>
        {sender} | <FormattedRelativeTime updateIntervalInSeconds={10} value={(timestamp - Date.now()) / 1000} />
      </p>
      <ul className={styles.messageGroupMessages}>{messages.map(message => getMessageComponent(message))}</ul>
    </li>
  );
}

ChatMessageGroup.propTypes = {
  sent: PropTypes.bool,
  sender: PropTypes.string,
  timestamp: PropTypes.any,
  messages: PropTypes.array
};

export const ChatMessageList = forwardRef(({ children, ...rest }, ref) => (
  <ul {...rest} className={styles.messageList} ref={ref}>
    {children}
  </ul>
));

ChatMessageList.propTypes = {
  children: PropTypes.node
};

export function ChatSidebar({ onClose, children, ...rest }) {
  return (
    <Sidebar
      title={<FormattedMessage id="chat-sidebar.title" defaultMessage="대화" />}
      beforeTitle={<CloseButton onClick={onClose} />}
      contentClassName={styles.content}
      {...rest}
    >
      {children}
    </Sidebar>
  );
}

ChatSidebar.propTypes = {
  onClose: PropTypes.func,
  onScrollList: PropTypes.func,
  children: PropTypes.node,
  listRef: PropTypes.func
};

export function ChatToolbarButton(props) {
  return (
    <ToolbarButton
      {...props}
      icon={<ChatIcon />}
      preset="accent4"
      label={<FormattedMessage id="chat-toolbar-button" defaultMessage="대화" />}
    />
  );
}
