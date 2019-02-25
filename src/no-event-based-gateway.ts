import {IModdleElement} from '@process-engine/bpmn-elements_contracts';
import * as lintUtils from 'bpmnlint-utils';

import {BpmnLintReporter} from './contracts/bpmn-lint-reporter';

/**
 * Rule that reports if the process contains an event based Gateway.
 *
 * Event based Gateways are currently not supported by the ProcessEngine.
 */
module.exports = (): any => {

  function check(node: IModdleElement, reporter: BpmnLintReporter): void {

    const nodeIsEventBasedGateway: boolean = lintUtils.is(node, 'bpmn:EventBasedGateway');
    if (nodeIsEventBasedGateway) {

      reporter.report(node.id, 'Event based Gateways are currently not supported!');
    }
  }

  return {
    check: check,
  };
};
