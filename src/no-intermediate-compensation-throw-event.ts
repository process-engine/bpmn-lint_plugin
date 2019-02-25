import {IModdleElement} from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if the process contains a intermediate compensation ThrowEvent.
 *
 * Intermediate compensation ThrowEvent are currently not supported by the ProcessEngine.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsIntermediateThrowEvent: boolean = lintUtils.is(node, 'bpmn:IntermediateThrowEvent');
    if (nodeIsIntermediateThrowEvent) {

      const intermediateEventHasEventDefinitions: boolean = node.eventDefinitions !== undefined;
      if (intermediateEventHasEventDefinitions) {

        const intermediateEventIsCompensationEvent: boolean = node.eventDefinitions.some((definition: IModdleElement) => {
          return lintUtils.is(definition, 'bpmn:CompensateEventDefinition');
        });

        if (intermediateEventIsCompensationEvent) {
          reporter.report(node.id, 'Intemediate compensation ThrowEvents are currently not supported!');
        }
      }

    }
  }

  return {
    check: check,
  };
};
