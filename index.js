module.exports = {
  configs: {
    recommended: {
      rules: {
        'process-engine/no-more-than-one-participant': 'error',
        'process-engine/start-event-required': 'error',
        'process-engine/end-event-required': 'error',
        'process-engine/no-duplicate-ids': 'error',
        'process-engine/no-conditional-start-event': 'error',
        'process-engine/no-compensation-end-event': 'error',
      }
    },
  }
}
