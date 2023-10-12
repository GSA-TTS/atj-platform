import { DocumentAssembler } from '../components/document-assembler';

export const HomePage = () => (
  <>
    <main id="main-content">
      <div className="bg-base-lightest">
        <section className="grid-container usa-section">
          <div className="grid-row flex-justify-center">
            <div className="grid-col-12 tablet:grid-col-12 desktop:grid-col-12">
              <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                <h1>ATJ Test Bed</h1>
                <DocumentAssembler />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </>
);
