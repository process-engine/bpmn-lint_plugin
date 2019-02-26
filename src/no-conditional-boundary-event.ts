import {IModdleElement} from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if the process contains a ConditionalBoundaryEvent.
 *
 * ConditionalBoundaryEvents are currently not supported by the ProcessEngine.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsBoundaryEvent: boolean = lintUtils.is(node, 'bpmn:BoundaryEvent');
    if (nodeIsBoundaryEvent) {

      const boundaryEventHasEventDefinitions: boolean = node.eventDefinitions !== undefined;
      if (boundaryEventHasEventDefinitions) {

        const boundaryEventIsConditionalEvent: boolean = node.eventDefinitions.some((definition: IModdleElement) => {
          return lintUtils.is(definition, 'bpmn:ConditionalEventDefinition');
        });

        if (boundaryEventIsConditionalEvent) {
          reporter.report(node.id, 'ConditionalBoundaryEvents are currently not supported!');
        }
      }

    }
  }

  return {
    check: check,
  };
};
