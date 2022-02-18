import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import configs from "../../utils/configs";
import { useIntl } from "react-intl";
import { LoadingScreen } from "./LoadingScreen";
import { useRoomLoadingState } from "./useRoomLoadingState";

export function LoadingScreenContainer({ onLoaded, scene }) {
  const intl = useIntl();

  const { loading, message } = useRoomLoadingState(scene);

  useEffect(
    () => {
      if (!loading) {
        onLoaded();
      }
    },
    [loading, onLoaded]
  );

  //TODO: Make these configurable
  const infoMessages = useMemo(
    () => [
      {
        heading: intl.formatMessage({ id: "loading-screen.heading.tip", defaultMessage: "도움말 :" }),
        message: intl.formatMessage({
          id: "loading-screen.message.keyboard-controls",
          defaultMessage: "Q(left) & E(right) 키를 사용하여 회전을 할 수 있습니다!"
        })
      }
      // {
      //   heading: intl.formatMessage({ id: "loading-screen.heading.whats-new", defaultMessage: "새 소식" }),
      //   message: intl.formatMessage(
      //     {
      //       id: "loading-screen.message.whats-new",
      //       defaultMessage: "새 소식을 확인하러 가시겠습니까? <a>바로 가기</a>"
      //     },
      //     {
      //       // eslint-disable-next-line react/display-name
      //       a: chunks => (
      //         <a href="/whats-new" target="_blank">
      //           {chunks}
      //         </a>
      //       )
      //     }
      //   )
      // }
    ],
    [intl]
  );

  return <LoadingScreen logoSrc={configs.image("logo")} message={message} infoMessages={infoMessages} />;
}

LoadingScreenContainer.propTypes = {
  scene: PropTypes.object.isRequired,
  onLoaded: PropTypes.func.isRequired
};
