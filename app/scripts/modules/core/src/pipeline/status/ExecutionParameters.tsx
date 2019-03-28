import * as React from 'react';

import { IDisplayableParameters } from 'core/pipeline';

import './executionStatus.less';
import './executionParameters.less';

export interface IExecutionParametersProps {
  shouldShowAllParams: boolean;
  displayableParameters: IDisplayableParameters;
  pinnedDisplayableParameters: IDisplayableParameters;
}

export class ExecutionParameters extends React.Component<IExecutionParametersProps> {
  constructor(props: IExecutionParametersProps) {
    super(props);
  }

  public render() {
    const { shouldShowAllParams, displayableParameters, pinnedDisplayableParameters } = this.props;

    let parameters = pinnedDisplayableParameters;
    if (shouldShowAllParams) {
      parameters = displayableParameters;
    }

    if (!parameters.length) {
      return null;
    }

    const halfWay = Math.ceil(parameters.length / 2);
    const paramsSplitIntoColumns = [parameters.slice(0, halfWay), parameters.slice(halfWay)];

    return (
      <div className="execution-parameters">
        <h6 className="params-title">
          {shouldShowAllParams || pinnedDisplayableParameters.length === displayableParameters.length ? '' : 'Pinned'}{' '}
          Parameters
        </h6>

        <div className="execution-parameters-container">
          {paramsSplitIntoColumns.map((c, i) => (
            <div key={`execution-params-column-${i}`} className="execution-parameters-column">
              {c.map(p => (
                <div key={p.key} className="an-execution-parameter">
                  <div className="parameter-key">{p.key}:</div>
                  <div className="parameter-value">{p.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
