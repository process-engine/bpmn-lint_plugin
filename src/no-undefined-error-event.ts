import {IErrorElement, IModdleElement} from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if a process contains an undefined Error Event.
 *
 * Error Events always need an event definition.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsEvent: boolean = lintUtils.is(node, 'bpmn:BoundaryEvent')
                              || lintUtils.is(node, 'bpmn:EndEvent')
                              || lintUtils.is(node, 'bpmn:StartEvent')
                              || lintUtils.is(node, 'bpmn:IntermediateThrowEvent')
                              || lintUtils.is(node, 'bpmn:IntermediateCatchEvent');

    if (nodeIsEvent) {
      const nodeIsErrorEvent: boolean = node.eventDefinitions.some((eventDefinition: IModdleElement) => {
        return lintUtils.is(eventDefinition, 'bpmn:ErrorEventDefinition');
      });

      if (nodeIsErrorEvent) {
        const errorEventDefinition: IErrorElement = node.eventDefinitions.find((eventDefinition: IModdleElement) => {
          return lintUtils.is(eventDefinition, 'bpmn:ErrorEventDefinition');
        });

        const errorRefIsUndefined: boolean = errorEventDefinition.errorRef === undefined;
        if (errorRefIsUndefined) {
          reporter.report(node.id, 'This Error Event is not defined.');
        }
      }
    }

  }

  return {
    check: check,
  };
};
