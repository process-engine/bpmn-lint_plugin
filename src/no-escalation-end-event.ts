import {IModdleElement} from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if a process contains an escalation EndEvent.
 *
 * Escalation EndEvents are currently not supported by the ProcessEngine.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsEndEvent: boolean = lintUtils.is(node, 'bpmn:EndEvent');
    if (nodeIsEndEvent) {

      const endEventHasEventDefinitions: boolean = node.eventDefinitions !== undefined;
      if (endEventHasEventDefinitions) {

        const endEventIsConditional: boolean = node.eventDefinitions.some((definition: IModdleElement) => {
          return lintUtils.is(definition, 'bpmn:EscalationEventDefinition');
        });

        if (endEventIsConditional) {
          reporter.report(node.id, 'Escalation EndEvents are currently not supported!');
        }
      }

    }
  }

  return {
    check: check,
  };
};
