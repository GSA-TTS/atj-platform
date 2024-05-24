import React, { useEffect } from 'react';

import Form, { type ComponentForPattern } from '../../Form';

import { AddPatternDropdown } from './AddPatternDropdown';
import { PreviewPattern } from './PreviewPattern';
import { useFormManagerStore } from '../store';
import { Toolbar } from './Toolbar';
import { useLocation } from 'react-router-dom';

const EditForm = () => {
  const session = useFormManagerStore(state => state.session);
  const { context, setRouteParams } = useFormManagerStore(state => ({
    context: state.context,
    setRouteParams: state.setRouteParams,
  }));
  const location = useLocation();

  // Update the state's routeParams on react-router-dom's update.
  useEffect(() => {
    const routeParams = location.search.startsWith('?')
      ? location.search.substring(1)
      : location.search;
    setRouteParams(routeParams);
  }, [location]);

  return (
    <div className="position-relative">
      <Toolbar uswdsRoot={context.uswdsRoot} />
      <div className="grid-row">
        <div className="grid-col-12">
          <AddPatternDropdown />
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-12">
          <Form
            isPreview={true}
            context={{
              config: context.config,
              // TODO: We might want to hoist this definition up to a higher level,
              // so we don't have to regenerate it every time we render the form.
              components: createPreviewComponents(context.components),
              uswdsRoot: context.uswdsRoot,
            }}
            session={session}
          ></Form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;

const createPreviewComponents = (
  components: ComponentForPattern
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  for (const patternType of Object.keys(components)) {
    previewComponents[patternType] = PreviewPattern;
  }
  return previewComponents;
};
