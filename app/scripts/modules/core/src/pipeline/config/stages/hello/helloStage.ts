import { Registry } from 'core/registry';

import { ExecutionDetailsTasks } from '../common';
import { HelloExecutionDetails } from './HelloExecutionDetails';
import { HelloExecutionLabel } from './HelloExecutionLabel';
import { HelloStageConfig } from './HelloStageConfig';

// We're registering the "hello" stage. This needs to be included from the pipeline.module
Registry.pipeline.registerStage({
  label: 'Hello', // Name visible to the user
  description: 'Says hello with your name', // Description of the stage
  key: 'hello',
  component: HelloStageConfig, // Pipeline configuration screen
  executionDetailsSections: [HelloExecutionDetails, ExecutionDetailsTasks], // Details section of a running pipeline
  executionLabelComponent: HelloExecutionLabel, // Component displayed in the execution bar
  useCustomTooltip: true,
  strategy: true,
  validators: [{ type: 'requiredField', fieldName: 'yourName' }],
});
