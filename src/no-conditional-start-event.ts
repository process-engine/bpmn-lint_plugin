import {IModdleElement} from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if the process contains a conditional StartEvent.
 *
 * Conditional StartEvents are currently not supported by the ProcessEngine.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsStartEvent: boolean = lintUtils.is(node, 'bpmn:StartEvent');
    if (nodeIsStartEvent) {

      const startEventHasEventDefinitions: boolean = node.eventDefinitions !== undefined;
      if (startEventHasEventDefinitions) {

        const startEventIsConditional: boolean = node.eventDefinitions.some((definition: IModdleElement) => {
          return lintUtils.is(definition, 'bpmn:ConditionalEventDefinition');
        });

        if (startEventIsConditional) {
          reporter.report(node.id, 'Conditional StartEvents are currently not supported!');
        }
      }

    }
  }

  return {
    check: check,
  };
};
