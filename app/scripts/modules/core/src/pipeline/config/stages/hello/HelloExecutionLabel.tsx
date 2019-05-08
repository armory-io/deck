import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { IExecutionStageLabelProps } from 'core/domain';
import { HoverablePopover } from 'core/presentation/HoverablePopover';
import { ExecutionBarLabel } from 'core/pipeline/config/stages/common/ExecutionBarLabel';

export class HelloExecutionLabel extends React.Component<IExecutionStageLabelProps> {
  constructor(props: IExecutionStageLabelProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { stage, executionMarker, children } = this.props;

    if (!executionMarker) {
      return <ExecutionBarLabel {...this.props} />;
    }
    if (stage.isRunning) {
      const template = (
        <div>
          <div>
            <b>{stage.name}</b>
          </div>
          We're setting your name!
        </div>
      );
      return <HoverablePopover template={template}>{children}</HoverablePopover>;
    }
    const tooltip = <Tooltip id={stage.id}>{stage.name}</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <span>{children}</span>
      </OverlayTrigger>
    );
  }
}
