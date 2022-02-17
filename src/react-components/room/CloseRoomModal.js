import React, { useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import { Button, CancelButton } from "../input/Button";
import { Column } from "../layout/Column";
import { TextInputField } from "../input/TextInputField";

export function CloseRoomModal({ roomName, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const [showIsNotMatchError, setShowIsNotMatchError] = useState(false);

  const onClickConfirm = useCallback(
    () => {
      if (confirmText.toLowerCase() === roomName.toLowerCase()) {
        onConfirm();
      } else {
        setShowIsNotMatchError(true);
      }
    },
    [onConfirm, confirmText, roomName]
  );

  return (
    <Modal
      title={<FormattedMessage id="close-room-modal.title" defaultMessage="방 닫기" />}
      beforeTitle={<CloseButton onClick={onClose} />}
    >
      <Column padding center centerMd="both" grow>
        <p>
          <FormattedMessage
            id="close-room-modal.message"
            defaultMessage="방을 닫으면 사용자를 포함한 모든 참가자가 제외되고 영구적으로 닫힙니다.{linebreak}확인하시겠습니까?"
            values={{ linebreak: <br /> }}
          />
        </p>
        <p>
          <FormattedMessage
            id="close-room-modal.type-to-confirm"
            defaultMessage="방 이름 입력 : {roomName}"
            values={{ roomName: <b>{roomName}</b> }}
          />
        </p>
        <TextInputField
          label={<FormattedMessage id="close-room-modal.confirm-room-name-field" defaultMessage="방 이름 확인" />}
          onChange={e => setConfirmText(e.target.value)}
          value={confirmText}
          error={
            showIsNotMatchError && (
              <FormattedMessage id="close-room-modal.room-name-match-error" defaultMessage="방 이름이 일치하지 않음" />
            )
          }
        />
        <Button preset="accept" onClick={onClickConfirm}>
          <FormattedMessage id="close-room-modal.confirm" defaultMessage="방을 닫겠습니다." />
        </Button>
        <CancelButton onClick={onClose} />
      </Column>
    </Modal>
  );
}

CloseRoomModal.propTypes = {
  roomName: PropTypes.string,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
};
