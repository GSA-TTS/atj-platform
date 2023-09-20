import { type GithubRepository, getBranchTreeUrl } from '../lib/github';

type FooterProps = {
  github: GithubRepository;
};

export const Footer = (props: FooterProps) => {
  return (
    <footer className="usa-footer usa-footer--slim">
      <div className="grid-container usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer__primary-section">
        <div className="usa-footer__primary-container grid-row">
          <div className="mobile-lg:grid-col-8">
            <nav className="usa-footer__nav" aria-label="Footer navigation,">
              <ul className="grid-row grid-gap">
                <li
                  className="
                mobile-lg:grid-col-6
                desktop:grid-col-auto
                usa-footer__primary-content
              "
                >
                  <a
                    className="usa-footer__primary-link"
                    href="https://10x.gsa.gov/"
                  >
                    10x
                  </a>
                </li>
                <li
                  className="
                mobile-lg:grid-col-6
                desktop:grid-col-auto
                usa-footer__primary-content
              "
                >
                  <a
                    className="usa-footer__primary-link"
                    href={getBranchTreeUrl(props.github, true)}
                  >
                    Github repository
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
