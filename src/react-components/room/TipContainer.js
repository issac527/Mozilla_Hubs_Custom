import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Tip } from "./Tip";
import { useEffect } from "react";
import { discordBridgesForPresences, hasEmbedPresences } from "../../utils/phoenix-utils";
import configs from "../../utils/configs";

// These keys are hardcoded in the input system to be based on the physical location on the keyboard rather than character
let moveKeys = "W A S D";
let turnLeftKey = "Q";
let turnRightKey = "E";

// TODO The API to map from physical key to character is experimental. Depending on prospects of this getting wider
// implimentation we may want to cook up our own polyfill based on observing key inputs
if (window.navigator.keyboard !== undefined && window.navigator.keyboard.getLayoutMap) {
  window.navigator.keyboard.getLayoutMap().then(function(map) {
    moveKeys = `${map.get("KeyW") || "W"} ${map.get("KeyA") || "A"} ${map.get("KeyS") || "S"} ${map.get("KeyD") ||
      "D"}`.toUpperCase();
    turnLeftKey = map.get("KeyQ")?.toUpperCase();
    turnRightKey = map.get("KeyE")?.toUpperCase();
  });
}

const onboardingMessages = defineMessages({
  "tips.mobile.look": {
    id: "tips.mobile.look",
    defaultMessage: "어서 오십시오!!👋 탭하고 드래그하여 둘러보세요."
  },
  "tips.mobile.locomotion": {
    id: "tips.mobile.locomotion",
    defaultMessage: "잘했습니다! 이동하려면 두손가락을 오므리세요."
  },
  "tips.mobile.invite": {
    id: "tips.mobile.invite",
    defaultMessage: "이 방을 공유하려면 왼쪽 하단의 초대 버튼을 사용하세요."
  },
  "tips.desktop.look": {
    id: "tips.desktop.look",
    defaultMessage: "{appName}에 오신 것을 환영합니다!!👋 클릭하고 드래그하여 둘러보세요."
  },
  "tips.desktop.locomotion": {
    id: "tips.desktop.locomotion",
    defaultMessage: "{moveKeys} 키를 사용하여 이동합니다. 빠르게 이동하려면 Shift 키를 누르세요."
  },
  "tips.desktop.turning": {
    id: "tips.desktop.turning",
    defaultMessage: "완벽합니다! {turnLeftKey}, {turnRightKey} 키를 사용하여 회전하세요."
  },
  "tips.desktop.invite": {
    id: "tips.desktop.invite",
    defaultMessage: "이 방을 공유하려면 왼쪽 하단의 초대 버튼을 사용하세요."
  }
});

function OkDismissLabel() {
  return <FormattedMessage id="tips.dismiss.ok" defaultMessage="확인" />;
}

function SkipDismissLabel() {
  return <FormattedMessage id="tips.dismiss.skip" defaultMessage="넘기기" />;
}

export function FullscreenTip(props) {
  return (
    <Tip {...props} dismissLabel={<OkDismissLabel />}>
      <FormattedMessage id="tips.fullscreen" defaultMessage="전체화면 모드로 진입했습니다. Esc 키를 눌러 UI 표시" />
    </Tip>
  );
}

export function TipContainer({ hide, inLobby, inRoom, isStreaming, isEmbedded, scene, store, hubId, presences }) {
  const intl = useIntl();
  const [lobbyTipDismissed, setLobbyTipDismissed] = useState(false);
  const [broadcastTipDismissed, setBroadcastTipDismissed] = useState(() =>
    store.state.confirmedBroadcastedRooms.includes(hubId)
  );
  const [streamingTipDismissed, setStreamingTipDismissed] = useState(false);
  const [embeddedTipDismissed, setEmbeddedTipDismissed] = useState(false);
  const [onboardingTipId, setOnboardingTipId] = useState(null);

  const onSkipOnboarding = useCallback(
    () => {
      scene.systems.tips.skipTips();
    },
    [scene]
  );

  useEffect(
    () => {
      function onSceneTipChanged({ detail: tipId }) {
        setOnboardingTipId(tipId);
      }

      scene.addEventListener("tip-changed", onSceneTipChanged);

      setOnboardingTipId(scene.systems.tips.activeTip);
    },
    [scene]
  );

  const discordBridges = presences ? discordBridgesForPresences(presences) : [];
  const isBroadcasting = discordBridges.length > 0;

  // TODO: This only exists because we store local state in this component.
  // If we move tip state to a context then we can remove this and not render this component at all.
  if (hide) {
    return null;
  }

  if (inLobby) {
    if (lobbyTipDismissed) {
      return null;
    }

    return (
      <Tip onDismiss={() => setLobbyTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
        <FormattedMessage
          id="tips.lobby"
          defaultMessage="로비에 접속했습니다. 다른 사람과 대화를 하거나 다른 사람을 볼 수 없습니다."
        />
      </Tip>
    );
  } else if (inRoom) {
    if (onboardingTipId) {
      return (
        <Tip onDismiss={onSkipOnboarding} dismissLabel={<SkipDismissLabel />}>
          {intl.formatMessage(onboardingMessages[onboardingTipId], {
            appName: configs.translation("app-name"),
            moveKeys,
            turnLeftKey,
            turnRightKey
          })}
        </Tip>
      );
    }

    if (isStreaming && !streamingTipDismissed) {
      return (
        <Tip onDismiss={() => setStreamingTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.streaming"
            defaultMessage="이제 로비로 방송 중입니다. 더보기 메뉴에서 스트리머 모드를 종료할 수 있습니다."
          />
        </Tip>
      );
    }

    if (isBroadcasting && !broadcastTipDismissed) {
      return (
        <Tip onDismiss={() => setBroadcastTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.discord"
            defaultMessage="이 방의 채팅은 Discord의 {broadcastTarget}에 연결됩니다."
            values={{ broadcastTarget: discordBridges.map(channelName => "#" + channelName).join(", ") }}
          />
        </Tip>
      );
    }

    if ((isEmbedded || hasEmbedPresences(presences)) && !embeddedTipDismissed) {
      return (
        <Tip onDismiss={() => setEmbeddedTipDismissed(true)} dismissLabel={<OkDismissLabel />}>
          <FormattedMessage
            id="tips.embedded"
            defaultMessage="이 방은 포함되어 있으므로 다른 방문자에게 표시될 수 있습니다."
          />
        </Tip>
      );
    }

    return null;
  }

  return null;
}

TipContainer.propTypes = {
  hide: PropTypes.bool,
  inLobby: PropTypes.bool,
  inRoom: PropTypes.bool,
  isStreaming: PropTypes.bool,
  isEmbedded: PropTypes.bool,
  scene: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  hubId: PropTypes.string,
  presences: PropTypes.object
};
