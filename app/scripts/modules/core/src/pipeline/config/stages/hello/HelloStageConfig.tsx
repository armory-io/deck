import * as React from 'react';

import { IStageConfigProps } from 'core/pipeline';
import { TextInput } from '@spinnaker/core';
import { StageConfigField } from '../common/stageConfigField/StageConfigField';

export interface IHelloStageConfigState {
  yourName: string;
}

export class HelloStageConfig extends React.Component<IStageConfigProps, IHelloStageConfigState> {
  public state = { yourName: '' };

  public static getDerivedStateFromProps(props: IStageConfigProps): IHelloStageConfigState {
    const { stage } = props;
    const { yourName } = stage;
    if (yourName === undefined) {
      stage.yourName = '';
    }
    return {
      yourName: stage.yourName,
    };
  }

  private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStageField({ yourName: event.target.value });
  };

  public render() {
    const { yourName } = this.state;
    return (
      <div className="form-horizontal">
        <StageConfigField label="Your Name" fieldColumns={6}>
          <TextInput type="text" className="form-control" onChange={this.onNameChange} value={yourName} />
        </StageConfigField>
      </div>
    );
  }
}
