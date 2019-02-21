import {IModdleElement} from '@process-engine/bpmn-elements_contracts';

import * as lintUtils from 'bpmnlint-utils';
import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if the given process has more than one participant.
 *
 * Multiple participants are currently not supported by the Process Engine.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const maxParticipantCount: number = 2;
    let participantCount: number = 0;

    const nodeIsParticipant: boolean = lintUtils.is(node, 'bpmn:Participant');
    if (nodeIsParticipant) {
      participantCount = participantCount + 1;

      const tooManyPaticipantsPresent: boolean = participantCount >= maxParticipantCount;
      if (tooManyPaticipantsPresent) {
        reporter.report(node.id, 'Two or more Participants are currently not supported');
      }

    }
  }

  return {
    check: check,
  };
};
