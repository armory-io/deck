import { module } from 'angular';

import { ArtifactTypePatterns } from 'core/artifact';
import { IArtifact } from 'core/domain/IArtifact';
import { Registry } from 'core/registry';

export const GITREPO_ARTIFACT = 'spinnaker.core.pipeline.trigger.gitrepo.artifact';
module(GITREPO_ARTIFACT, []).config(() => {
  Registry.pipeline.mergeArtifactKind({
    label: 'GitRepo',
    description: 'A git repository hosted by GitHub.',
    key: 'gitrepo',
    typePattern: ArtifactTypePatterns.GIT_REPO,
    type: 'git/repo',
    isDefault: false,
    isMatch: true,
    controller: function(artifact: IArtifact) {
      this.artifact = artifact;
      this.artifact.type = 'git/repo';
    },
    controllerAs: 'ctrl',
    template: `
<div class="col-md-12">
  <div class="form-group row">
    <label class="col-md-2 sm-label-right">
      File path
      <help-field key="pipeline.config.expectedArtifact.gitrepo.name"></help-field>
    </label>
    <div class="col-md-8">
      <input type="text"
             placeholder="manifests/frontend.yaml"
             class="form-control input-sm"
             ng-model="ctrl.artifact.name"/>
    </div>
  </div>
</div>
`,
  });
});
