import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { ReactComponent as VRIcon } from "../icons/VR.svg";
import styles from "./EnterOnDeviceModal.scss";
import { BackButton } from "../input/BackButton";
import { Column } from "../layout/Column";
import { FormattedMessage, useIntl } from "react-intl";

export function EnterOnDeviceModal({
  className,
  shortUrl,
  loadingCode,
  code,
  headsetConnected,
  unsupportedBrowser,
  onEnterOnConnectedHeadset,
  onBack,
  ...rest
}) {
  const intl = useIntl();

  return (
    <Modal
      title={<FormattedMessage id="enter-on-device-modal.title" defaultMessage="VR 입장" />}
      beforeTitle={<BackButton onClick={onBack} />}
      className={className}
      {...rest}
    >
      <Column center={loadingCode ? "both" : true} padding grow>
        {loadingCode ? (
          <b>
            <FormattedMessage id="enter-on-device-modal.generating-code" defaultMessage="코드 생성 중 ..." />
          </b>
        ) : (
          <>
            <b>
              <FormattedMessage id="enter-on-device-modal.heading" defaultMessage="무선 헤드셋으로 입장" />
            </b>
            <small>
              <FormattedMessage
                id="enter-on-device-modal.short-url-directions"
                defaultMessage="다음 위치로 이동합니다 :"
              />
            </small>
            <div className={styles.shortUrlContainer}>{shortUrl}</div>
            <small>
              <FormattedMessage id="enter-on-device-modal.code-directions" defaultMessage="일회성 코드 입력 :" />
            </small>
            <div className={styles.codeContainer}>
              {code.split("").map((char, i) => (
                <div key={i} className={styles.codeLetter}>
                  {char}
                </div>
              ))}
            </div>
            <strong>
              <FormattedMessage
                id="enter-on-device-modal.data-transfer"
                defaultMessage="계정과 아바타가 기기로 전송됩니다."
              />
            </strong>
            <strong>
              <FormattedMessage
                id="enter-on-device-modal.keep-page-open"
                defaultMessage="이 코드를 사용하려면 페이지를 열어두세요."
              />
            </strong>
            {headsetConnected && (
              <>
                <hr
                  data-or-text={intl.formatMessage({
                    id: "enter-on-device-modal.divider-label",
                    defaultMessage: "또는"
                  })}
                />
                <b>
                  <FormattedMessage
                    id="enter-on-device-modal.headset-connected-heading"
                    defaultMessage="연결된 헤드셋에 입력"
                  />
                </b>
                {unsupportedBrowser ? (
                  <>
                    <small>
                      <FormattedMessage
                        id="enter-on-device-modal.unsupported-browser"
                        defaultMessage="해당 브라우저에서는 WebVR이 지원되지 않습니다. VR을 사용하려면 Firefox브라우저를 사용해주세요."
                      />
                    </small>
                    <Button
                      as="a"
                      preset="accent2"
                      href="https://www.mozilla.org/firefox/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span>
                        <FormattedMessage
                          id="enter-on-device-modal.download-firefox-button"
                          defaultMessage="Download Firefox"
                        />
                      </span>
                    </Button>
                  </>
                ) : (
                  <>
                    <small>
                      <FormattedMessage
                        id="enter-on-device-modal.headset-connected-message"
                        defaultMessage="이 기기에 연결된 VR 헤드셋이 있습니다."
                      />
                    </small>
                    <Button preset="accent5" onClick={onEnterOnConnectedHeadset}>
                      <VRIcon />
                      <span>
                        <FormattedMessage id="enter-on-device-modal.enter-in-vr-button" defaultMessage="VR 입장" />
                      </span>
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Column>
    </Modal>
  );
}

EnterOnDeviceModal.propTypes = {
  className: PropTypes.string,
  shortUrl: PropTypes.string.isRequired,
  loadingCode: PropTypes.bool,
  code: PropTypes.string,
  headsetConnected: PropTypes.bool,
  unsupportedBrowser: PropTypes.bool,
  onEnterOnConnectedHeadset: PropTypes.func,
  onBack: PropTypes.func
};
