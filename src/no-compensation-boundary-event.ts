import {IModdleElement} from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if the process contains a compensation BoundaryEvent.
 *
 * Compensation BoundaryEvents are currently not supported by the ProcessEngine.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsBoundaryEvent: boolean = lintUtils.is(node, 'bpmn:BoundaryEvent');
    if (nodeIsBoundaryEvent) {

      const boundaryEventHasEventDefinitions: boolean = node.eventDefinitions !== undefined;
      if (boundaryEventHasEventDefinitions) {

        const boundaryEventIsCompensationEvent: boolean = node.eventDefinitions.some((definition: IModdleElement) => {
          return lintUtils.is(definition, 'bpmn:CompensateEventDefinition');
        });

        if (boundaryEventIsCompensationEvent) {
          reporter.report(node.id, 'Compensation BoundaryEvents are currently not supported!');
        }
      }

    }
  }

  return {
    check: check,
  };
};
