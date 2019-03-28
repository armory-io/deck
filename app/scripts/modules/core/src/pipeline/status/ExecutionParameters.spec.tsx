import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { mock } from 'angular';

import { REACT_MODULE } from 'core/reactShims';

import { IExecution } from 'core/domain';

import { IExecutionParametersProps, IExecutionParametersState, ExecutionParameters } from './ExecutionParameters';

describe('<ExecutionParameters/>', () => {
  let component: ShallowWrapper<IExecutionParametersProps, IExecutionParametersState>;

  beforeEach(mock.module(REACT_MODULE));
  beforeEach(mock.inject(() => {})); // Angular is lazy.

  it('adds parameters, sorted alphabetically, to vm if present on trigger', function() {
    const execution: IExecution = {
      trigger: {
        parameters: {
          a: 'b',
          b: 'c',
          d: 'a',
        },
      },
    } as any;

    component = shallow(<ExecutionParameters execution={execution} shouldShowAllParams={true} />);

    expect(component.state().parameters).toEqual([
      { key: 'a', value: '"b"' },
      { key: 'b', value: '"c"' },
      { key: 'd', value: '"a"' },
    ]);
  });

  it('returns null if not we shouldnt be displaying parameters', function() {
    const execution: IExecution = {
      trigger: {
        parameters: {
          a: 'b',
        },
      },
    } as any;

    component = shallow(<ExecutionParameters execution={execution} shouldShowAllParams={false} />);

    expect(component.get(0)).toEqual(null);
  });

  it('does not add parameters to vm if none present in trigger', function() {
    const execution: IExecution = { trigger: {} } as any;
    component = shallow(<ExecutionParameters execution={execution} shouldShowAllParams={true} />);
    expect(component.state().parameters).toEqual([]);
  });

  it('excludes some parameters if the pipeline is a strategy', function() {
    const execution: IExecution = {
      isStrategy: true,
      trigger: {
        parameters: {
          included: 'a',
          parentPipelineId: 'b',
          strategy: 'c',
          parentStageId: 'd',
          deploymentDetails: 'e',
          cloudProvider: 'f',
        },
      },
    } as any;

    component = shallow(<ExecutionParameters execution={execution} shouldShowAllParams={true} />);

    expect(component.state().parameters).toEqual([{ key: 'included', value: '"a"' }]);
  });

  it('displays two parameters, in a single column view', function() {
    const execution: IExecution = {
      trigger: {
        parameters: {
          a: '1',
          b: '2',
        },
      },
    } as any;

    component = shallow(<ExecutionParameters execution={execution} shouldShowAllParams={true} />);

    expect(component.find('.execution-parameters-column').length).toEqual(1);
    expect(component.find('.parameter-key').length).toEqual(2);
    expect(component.find('.parameter-value').length).toEqual(2);
  });

  it('displays two parameters, in two column view', function() {
    const execution: IExecution = {
      trigger: {
        parameters: {
          a: '1',
          b: '2',
        },
      },
    } as any;

    component = shallow(<ExecutionParameters execution={execution} shouldShowAllParams={true} />);

    expect(component.find('.execution-parameters-column').length).toEqual(2);
    expect(component.find('.parameter-key').length).toEqual(2);
    expect(component.find('.parameter-value').length).toEqual(2);
  });
});
