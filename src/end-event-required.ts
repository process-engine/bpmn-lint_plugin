import {IModdleElement, IProcessRef} from '@process-engine/bpmn-elements_contracts';

import * as lintUtils from 'bpmnlint-utils';
import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if a process has no EndEvent.
 */
module.exports = (): any => {

  function hasNoStartEvent(node: IModdleElement): boolean {
    const flowElements: Array<IModdleElement> = node.flowElements;

    const startEventPresent: boolean = flowElements.some((element: IModdleElement) => {
      return lintUtils.is(element, 'bpmn:EndEvent');
    });

    return !startEventPresent;
  }

  function getParticipantOfProcess(process: IProcessRef): IModdleElement {
    const collaboration: IModdleElement = process.$parent.rootElements.find((element: IModdleElement) => {
      return lintUtils.is(element, 'bpmn:Collaboration');
    });

    const participant: IModdleElement = collaboration.participants[0];

    return participant;
  }

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {
    const nodeIsProcessOrSubProcess: boolean = lintUtils.isAny(node, ['bpmn:Process', 'bpmn:SubProcess']);

    if (nodeIsProcessOrSubProcess) {
      const processHasNoStartEvent: boolean = hasNoStartEvent(node);

      if (processHasNoStartEvent) {
        const participant: IModdleElement = getParticipantOfProcess(node as IProcessRef);

        reporter.report(participant.id, 'This process has no EndEvent');
      }

    }
  }

  return {
    check: check,
  };
};
