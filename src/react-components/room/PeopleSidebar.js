import React from "react";
import PropTypes from "prop-types";
import styles from "./PeopleSidebar.scss";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { IconButton } from "../input/IconButton";
import { ReactComponent as StarIcon } from "../icons/Star.svg";
import { ReactComponent as DesktopIcon } from "../icons/Desktop.svg";
import { ReactComponent as DiscordIcon } from "../icons/Discord.svg";
import { ReactComponent as PhoneIcon } from "../icons/Phone.svg";
import { ReactComponent as VRIcon } from "../icons/VR.svg";
import { ReactComponent as VolumeOffIcon } from "../icons/VolumeOff.svg";
import { ReactComponent as VolumeHighIcon } from "../icons/VolumeHigh.svg";
import { ReactComponent as VolumeMutedIcon } from "../icons/VolumeMuted.svg";
import { List, ButtonListItem } from "../layout/List";
import { FormattedMessage, useIntl } from "react-intl";

function getDeviceLabel(ctx, intl) {
  if (ctx) {
    if (ctx.hmd) {
      return intl.formatMessage({ id: "people-sidebar.device-label.vr", defaultMessage: "VR" });
    } else if (ctx.discord) {
      return intl.formatMessage({ id: "people-sidebar.device-label.discord", defaultMessage: "Discord Bot" });
    } else if (ctx.mobile) {
      return intl.formatMessage({ id: "people-sidebar.device-label.mobile", defaultMessage: "모바일" });
    }
  }

  return intl.formatMessage({ id: "people-sidebar.device-label.desktop", defaultMessage: "데스크탑" });
}

function getDeviceIconComponent(ctx) {
  if (ctx) {
    if (ctx.hmd) {
      return VRIcon;
    } else if (ctx.discord) {
      return DiscordIcon;
    } else if (ctx.mobile) {
      return PhoneIcon;
    }
  }

  return DesktopIcon;
}

function getVoiceLabel(micPresence, intl) {
  if (micPresence) {
    if (micPresence.talking) {
      return intl.formatMessage({ id: "people-sidebar.voice-label.talking", defaultMessage: "말하기" });
    } else if (micPresence.muted) {
      return intl.formatMessage({ id: "people-sidebar.voice-label.muted", defaultMessage: "음소거" });
    }
  }

  return intl.formatMessage({ id: "people-sidebar.voice-label.not-talking", defaultMessage: "말안하기" });
}

function getVoiceIconComponent(micPresence) {
  if (micPresence) {
    if (micPresence.muted) {
      return VolumeMutedIcon;
    } else if (micPresence.talking) {
      return VolumeHighIcon;
    }
  }

  return VolumeOffIcon;
}

function getPresenceMessage(presence, intl) {
  switch (presence) {
    case "lobby":
      return intl.formatMessage({ id: "people-sidebar.presence.in-lobby", defaultMessage: "로비" });
    case "room":
      return intl.formatMessage({ id: "people-sidebar.presence.in-room", defaultMessage: "방" });
    case "entering":
      return intl.formatMessage({ id: "people-sidebar.presence.entering", defaultMessage: "방 입장" });
    default:
      return undefined;
  }
}

function getPersonName(person, intl) {
  const you = intl.formatMessage({
    id: "people-sidebar.person-name.you",
    defaultMessage: "나"
  });

  return person.profile.displayName + (person.isMe ? ` (${you})` : "");
}

export function PeopleSidebar({ people, onSelectPerson, onClose, showMuteAll, onMuteAll }) {
  const intl = useIntl();

  return (
    <Sidebar
      title={
        <FormattedMessage
          id="people-sidebar.title"
          defaultMessage="접속자 ({numPeople})"
          values={{ numPeople: people.length }}
        />
      }
      beforeTitle={<CloseButton onClick={onClose} />}
      afterTitle={
        showMuteAll ? (
          <IconButton onClick={onMuteAll}>
            <FormattedMessage id="people-sidebar.mute-all-button" defaultMessage="전체 차단" />
          </IconButton>
        ) : (
          undefined
        )
      }
    >
      <List>
        {people.map(person => {
          const DeviceIcon = getDeviceIconComponent(person.context);
          const VoiceIcon = getVoiceIconComponent(person.micPresence);

          return (
            <ButtonListItem
              className={styles.person}
              key={person.id}
              type="button"
              onClick={e => onSelectPerson(person, e)}
            >
              {<DeviceIcon title={getDeviceLabel(person.context, intl)} />}
              {!person.context.discord && VoiceIcon && <VoiceIcon title={getVoiceLabel(person.micPresence, intl)} />}
              <p>{getPersonName(person, intl)}</p>
              {person.roles.owner && (
                <StarIcon
                  title={intl.formatMessage({ id: "people-sidebar.moderator-label", defaultMessage: "방장" })}
                  className={styles.moderatorIcon}
                  width={12}
                  height={12}
                />
              )}
              <p className={styles.presence}>{getPresenceMessage(person.presence, intl)}</p>
            </ButtonListItem>
          );
        })}
      </List>
    </Sidebar>
  );
}

PeopleSidebar.propTypes = {
  people: PropTypes.array,
  onSelectPerson: PropTypes.func,
  showMuteAll: PropTypes.bool,
  onMuteAll: PropTypes.func,
  onClose: PropTypes.func
};

PeopleSidebar.defaultProps = {
  people: [],
  onSelectPerson: () => {}
};
