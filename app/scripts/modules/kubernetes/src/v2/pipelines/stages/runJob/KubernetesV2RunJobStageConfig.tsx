import * as React from 'react';

import {
  SETTINGS,
  ExpectedArtifactSelector,
  StageArtifactSelector,
  StageConfigField,
  IStageConfigProps,
  AccountService,
  YamlEditor,
  yamlDocumentsToString,
  IAccount,
} from '@spinnaker/core';

import { ManifestBasicSettings } from 'kubernetes/v2/manifest/wizard/BasicSettings';
import Select from 'react-select';

export interface IKubernetesRunJobStageConfigState {
  credentials: IAccount[];
  rawManifest?: string;
}

export class KubernetesV2RunJobStageConfig extends React.Component<IStageConfigProps> {
  public state: IKubernetesRunJobStageConfigState = {
    credentials: [],
    options: [
      { value: 'none', label: 'None' },
      { value: 'logs', label: 'Logs' },
      { value: 'artifacts', label: 'Artifacts' },
    ],
    selected: { value: 'none', label: 'None' },
    selectedArtifact: {},
  };

  public accountChanged = (account: string) => {
    this.props.updateStageField({
      credentails: account,
      account: account,
    });
  };

  public handleRawManifestChange = (rawManifest: string, manifests: any) => {
    if (manifests) {
      this.props.updateStageField({ manifest: manifests[0] });
    }
    this.setState({ rawManifest });
  };

  public initRawManifest() {
    const { stage } = this.props;
    if (stage.manifest) {
      this.setState({ rawManifest: yamlDocumentsToString([stage.manifest]) });
    }
  }

  public componentDidMount() {
    this.props.updateStageField({ cloudProvider: 'kubernetes' });
    AccountService.getAllAccountDetailsForProvider('kubernetes', 'v2').then((accounts: any) => {
      this.setState({ credentials: accounts });
    });
    this.initRawManifest();
  }

  private handleOutputTypeChange = (selected: any) => {
    this.setState({ selected: selected });
  };

  private handlePropertyFile = (e: any) => {
    this.props.updateStageField({ propertyFile: e.target.value });
  };

  private stuff = (e: any) => {
    this.props.updateStageField({ consumeArtifactID: e.id });
    this.setState({ selectedArtifact: e });
  };

  public render() {
    const { application, stage } = this.props;

    return (
      <div className="container-fluid form-horizontal">
        <h4>Basic Settings</h4>
        <ManifestBasicSettings
          app={application}
          selectedAccount={stage.account || ''}
          accounts={this.state.credentials}
          onAccountSelect={(selectedAccount: string) => this.accountChanged(selectedAccount)}
        />
        <h4>Job Output</h4>
        <StageConfigField helpKey="kubernetes.manifest.delete.gracePeriod" label="Type">
          <Select
            className="form-control input-sm"
            onChange={this.handleOutputTypeChange}
            options={this.state.options}
            value={this.state.selected}
            clearable={false}
            required={true}
          />
          {this.state.selected.value === 'logs' && (
            <StageConfigField label="Property File">
              <input onChange={this.handlePropertyFile} type="text" />
            </StageConfigField>
          )}
          {this.state.selected.value === 'artifacts' && SETTINGS.feature['artifactsRewrite'] && (
            <StageArtifactSelector
              pipeline={this.props.pipeline}
              stage={this.props.stage}
              // expectedArtifactId={manifest && manifest.artifactId}
              // artifact={manifest && manifest.artifact}
              onExpectedArtifactSelected={this.stuff}
              onArtifactEdited={this.stuff}
              // excludedArtifactTypePatterns={this.excludedArtifactTypePatterns}
              // renderLabel={(field: React.ReactNode) => {
              //   return <FormikConfigField label={'Artifact'}>{field}</FormikConfigField>;
              // }}
            />
          )}
          {this.state.selected.value === 'artifacts' && !SETTINGS.feature['artifactsRewrite'] && (
            <ExpectedArtifactSelector
              // excludedArtifactTypes={excludedArtifactTypes}
              expectedArtifacts={this.props.pipeline.expectedArtifacts}
              // selected={this.getSelectedExpectedArtifact(selectedArtifactId)}
              onChange={this.stuff}
              // onRequestCreate={this.onRequestCreateArtifact}
              // requestingNew={showCreateArtifactForm}
            />
          )}
        </StageConfigField>
        <h4>Manifest Configuration</h4>
        <YamlEditor value={this.state.rawManifest} onChange={this.handleRawManifestChange} />
      </div>
    );
  }
}
