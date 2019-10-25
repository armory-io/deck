import { cloneDeep, get, isEmpty } from 'lodash';
import * as React from 'react';

import { ArtifactTypePatterns } from 'core/artifact';
import { IArtifactEditorProps, IArtifactKindConfig } from 'core/domain';
import { StageConfigField } from 'core/pipeline';
import { SpelText } from 'core/widgets';
import { ArtifactEditor } from '../ArtifactEditor';
import { CheckboxInput } from '../../../../../presentation/forms/inputs';

const TYPE = 'git/repo';

interface IGitRepoArtifactEditorState {
  includesSubPath: boolean;
}

class GitRepoArtifactEditor extends React.Component<IArtifactEditorProps, IGitRepoArtifactEditorState> {
  public constructor(props: IArtifactEditorProps) {
    super(props);
    const { artifact } = this.props;
    this.state = {
      includesSubPath: get(artifact, 'metadata.subPath', '') !== '',
    };
  }

  private onIncludesSubPathChange = (event: any) => {
    this.setState({ includesSubPath: event.target.checked });
  };

  private onReferenceChanged = (reference: string) => {
    const clonedArtifact = cloneDeep(this.props.artifact);
    clonedArtifact.reference = reference;
    this.props.onChange(clonedArtifact);
  };

  private onVersionChanged = (version: string) => {
    const clonedArtifact = cloneDeep(this.props.artifact);
    clonedArtifact.version = version;
    this.props.onChange(clonedArtifact);
  };

  private onSubPathChanged = (subPath: string) => {
    const clonedArtifact = cloneDeep(this.props.artifact);
    const metadata = get(clonedArtifact, 'metadata', {}) as any;
    metadata.subPath = subPath;
    clonedArtifact.metadata = metadata;
    this.props.onChange(clonedArtifact);
  };

  public render() {
    const { artifact } = this.props;

    return (
      <>
        <StageConfigField label="URL">
          <SpelText
            placeholder="https or ssh to your git repo"
            value={artifact.reference}
            onChange={this.onReferenceChanged}
            pipeline={this.props.pipeline}
            docLink={true}
          />
        </StageConfigField>
        <StageConfigField label="Branch">
          <SpelText
            placeholder="master"
            value={artifact.version}
            onChange={this.onVersionChanged}
            pipeline={this.props.pipeline}
            docLink={true}
          />
        </StageConfigField>
        <StageConfigField label="Checkout subpath">
          <CheckboxInput checked={this.state.includesSubPath} onChange={this.onIncludesSubPathChange} />
        </StageConfigField>
        {this.state.includesSubPath && (
          <StageConfigField label="Subpath">
            <SpelText
              placeholder="path/to/subdirectory"
              value={get(artifact, 'metadata.subPath', '')}
              onChange={this.onSubPathChanged}
              pipeline={this.props.pipeline}
              docLink={true}
            />
          </StageConfigField>
        )}
      </>
    );
  }
}

export const GitRepoMatch: IArtifactKindConfig = {
  label: 'GitRepo',
  description: 'A git repository hosted by GitHub.',
  key: 'gitrepo',
  typePattern: ArtifactTypePatterns.GIT_REPO,
  type: TYPE,
  isDefault: false,
  isMatch: true,
  editCmp: GitRepoArtifactEditor,
  // editCmp: singleFieldArtifactEditor(
  //   'name',
  //   TYPE,
  //   'File path asdfs',
  //   'manifests/frontend.yaml',
  //   'pipeline.config.expectedArtifact.gitrepo.name',
  // ),
};

export const GitRepoDefault: IArtifactKindConfig = {
  label: 'GitRepo',
  typePattern: ArtifactTypePatterns.GIT_REPO,
  type: TYPE,
  description: 'A git repository hosted by GitHub.',
  key: 'default.gitrepo',
  isDefault: true,
  isMatch: false,
  editCmp: GitRepoArtifactEditor,
};
