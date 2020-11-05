import { IMessageTask, IModdleElement } from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if a process contains an undefined Send- or ReceiveTask.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsMessageTask: boolean = lintUtils.is(node, 'bpmn:SendTask')
                                    || lintUtils.is(node, 'bpmn:ReceiveTask');

    if (nodeIsMessageTask) {
      const eventElement: IMessageTask = node as IMessageTask;

      const noMessageDefined = eventElement.messageRef == null;

      if (noMessageDefined) {
        reporter.report(node.id, 'The Message is not defined.');
      }
    }

  }

  return {
    check: check,
  };
};
