
const {is} = require('bpmnlint-utils');

/**
 * Rule that reports more than one participant.
 *
 * Two or more participants are currently not supported by the Process Engine.
 */
module.exports = function() {

  let participantCount = 0;

  function check(node, reporter) {
    if (is(node, 'bpmn:Participant')) {
      participantCount += 1;

      if(participantCount > 1) {
        reporter.report(node.id, 'Two or more Participants are currently not supported');
      }
    }
  }

  return {
    check: check
  };
};
