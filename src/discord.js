import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./utils/configs";
import { FormattedMessage } from "react-intl";
import { WrappedIntlProvider } from "./react-components/wrapped-intl-provider";
import "./react-components/styles/global.scss";
import styles from "./assets/stylesheets/discord.scss";
import discordBotLogo from "./assets/images/discord-bot-logo.png";
import discordBotVideoMP4 from "./assets/video/discord.mp4";
import discordBotVideoWebM from "./assets/video/discord.webm";
import Store from "./storage/store";

import registerTelemetry from "./telemetry";
import { ThemeProvider } from "./react-components/styles/theme";

registerTelemetry("/discord", "Discord Landing Page");

const inviteUrl = "https://forms.gle/GGPgarSuY5WaTNCT8";

const store = new Store();

class DiscordPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <WrappedIntlProvider>
        <ThemeProvider store={store}>
          <div className={styles.ui}>
            <div className={styles.header}>
              <div className={styles.headerLinks}>
                <a href="/" rel="noreferrer noopener">
                  <FormattedMessage id="discord-page.hubs-cta" defaultMessage="Hubs 사용" />
                </a>
                <a href="https://discord.gg/dFJncWwHun" rel="noreferrer noopener">
                  <FormattedMessage id="discord-page.community-link" defaultMessage="Hubs Discord" />
                </a>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.heroPane}>
                <div className={styles.heroMessage}>
                  <div className={styles.discordLogo}>
                    <img src={discordBotLogo} />
                  </div>
                  <div className={styles.primaryTagline}>
                    <FormattedMessage
                      id="discord-page.primary-tagline"
                      defaultMessage="가상 공간을 커뮤니티에서 공유.{linebreak}친구들과 함께 비디오를 보거나 놀아보세요~!"
                      values={{ linebreak: <br /> }}
                    />
                  </div>
                  <div className={styles.secondaryTagline}>
                    <FormattedMessage
                      id="discord-page.secondary-tagline"
                      defaultMessage="다운로드, 가입이 필요없으며! VR도 지원합니다!"
                    />
                  </div>
                  <div className={styles.actionButtons}>
                    <a href={inviteUrl} className={styles.downloadButton}>
                      <div>
                        <FormattedMessage id="discord-page.invite-button" defaultMessage="서버에 봇 초대" />
                      </div>
                    </a>
                  </div>
                </div>
                <div className={styles.heroSplash}>
                  <video playsInline loop autoPlay muted>
                    <source src={discordBotVideoMP4} type="video/mp4" />
                    <source src={discordBotVideoWebM} type="video/webm" />
                  </video>
                  <div className={styles.splashTagline}>
                    <FormattedMessage id="discord-page.splash-tag" defaultMessage="효율적인 비즈니스를 위한 설계" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bg} />
          </div>
        </ThemeProvider>
      </WrappedIntlProvider>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<DiscordPage />, document.getElementById("ui-root"));
});
