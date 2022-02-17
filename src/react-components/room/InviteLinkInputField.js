import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./RoomSettingsSidebar.scss";
import { IconButton } from "../input/IconButton";
import { FormattedMessage, useIntl } from "react-intl";
import { CopyableTextInputField } from "../input/CopyableTextInputField";

export function InviteLinkInputField({ fetchingInvite, inviteUrl, onRevokeInvite }) {
  const intl = useIntl();

  const [showRevokeConfirmation, setShowRevokeConfirmation] = useState(false);

  const revokeInvite = useCallback(() => {
    setShowRevokeConfirmation(true);
  }, []);

  const cancelConfirmRevokeInvite = useCallback(() => {
    setShowRevokeConfirmation(false);
  }, []);

  const confirmRevokeInvite = useCallback(
    () => {
      onRevokeInvite();
      setShowRevokeConfirmation(false);
    },
    [onRevokeInvite]
  );

  return (
    <CopyableTextInputField
      label={<FormattedMessage id="invite-link-input-field.label" defaultMessage="초대 링크" />}
      disabled={fetchingInvite}
      value={
        fetchingInvite
          ? intl.formatMessage({
              id: "invite-link-input-field.generating-invite",
              defaultMessage: "초대 링크 준비중 ..."
            })
          : inviteUrl
      }
      buttonPreset="primary"
      description={
        !fetchingInvite &&
        (showRevokeConfirmation ? (
          <>
            <FormattedMessage id="invite-link-input-field.revoke-confirm" defaultMessage="확실합니까?" />{" "}
            <IconButton className={styles.confirmRevokeButton} onClick={confirmRevokeInvite}>
              <FormattedMessage id="invite-link-input-field.revoke-confirm-yes" defaultMessage="예" />
            </IconButton>{" "}
            /{" "}
            <IconButton className={styles.confirmRevokeButton} onClick={cancelConfirmRevokeInvite}>
              <FormattedMessage id="invite-link-input-field.revoke-confirm-no" defaultMessage="아니요" />
            </IconButton>
          </>
        ) : (
          <IconButton className={styles.confirmRevokeButton} onClick={revokeInvite}>
            <FormattedMessage id="invite-link-input-field.revoke" defaultMessage="취소" />
          </IconButton>
        ))
      }
      fullWidth
    />
  );
}

InviteLinkInputField.propTypes = {
  fetchingInvite: PropTypes.bool,
  inviteUrl: PropTypes.string,
  onRevokeInvite: PropTypes.func.isRequired
};
