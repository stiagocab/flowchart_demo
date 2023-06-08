export const awsExample = {
    Comment: 'A Hello World example demonstrating various state types of the Amazon States Language',
    StartAt: 'Get VTEX Order',
    States: {
        'Get VTEX Order': {
            Type: 'Task',
            Resource: 'arn:aws:states:::lambda:invoke',
            Parameters: {
                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST',
                Payload: {
                    workflowId: 'hebmx-order-creation',
                    function: 'getOrder',
                    'orderId.$': '$.OrderId',
                    bucket: 'hebmx-middleware-bucket'
                }
            },
            Retry: [
                {
                    ErrorEquals: [
                        'Lambda.ServiceException',
                        'Lambda.AWSLambdaException',
                        'Lambda.SdkClientException',
                        'Lambda.TooManyRequestsException'
                    ],
                    IntervalSeconds: 2,
                    MaxAttempts: 6,
                    BackoffRate: 2
                }
            ],
            Next: 'Parallel Execution',
            OutputPath: '$.Payload'
        },
        'Parallel Execution': {
            Type: 'Parallel',
            Branches: [
                {
                    StartAt: 'Save Order Deals & Items',
                    States: {
                        'Save Order Deals & Items': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            OutputPath: '$.Payload',
                            Parameters: {
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'saveOrderDealsItems',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    'order.$': '$.order'
                                },
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST'
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 6,
                                    BackoffRate: 2
                                }
                            ],
                            Next: 'Save Counters'
                        },
                        'Save Counters': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            OutputPath: '$.Payload',
                            Parameters: {
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'orderDealCounter',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    'order.$': '$.order'
                                },
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST'
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 6,
                                    BackoffRate: 2
                                }
                            ],
                            End: true
                        }
                    }
                },
                {
                    StartAt: 'Get Instaleap Availability',
                    States: {
                        'Get Instaleap Availability': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            Parameters: {
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST',
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'getAvailability',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    'order.$': '$.order'
                                }
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 3,
                                    BackoffRate: 2
                                }
                            ],
                            Next: 'Has availability ?'
                        },
                        'Has availability ?': {
                            Type: 'Choice',
                            Choices: [
                                {
                                    Variable: '$.hasAvailability',
                                    BooleanEquals: true,
                                    Next: 'Send JobSync'
                                }
                            ],
                            InputPath: '$.Payload',
                            Default: 'Get Instaleap Availability  (3days Schedule)'
                        },
                        'Get Instaleap Availability  (3days Schedule)': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            Parameters: {
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST',
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'getAvailability',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    threeDaysSchedule: true,
                                    'order.$': '$.order'
                                }
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 6,
                                    BackoffRate: 2
                                }
                            ],
                            Next: 'Has availability ? (3days Schedule)'
                        },
                        'Has availability ? (3days Schedule)': {
                            Type: 'Choice',
                            Choices: [
                                {
                                    Variable: '$.hasAvailability',
                                    BooleanEquals: true,
                                    Next: 'SendEmail'
                                }
                            ],
                            InputPath: '$.Payload',
                            Default: 'No Timeslots'
                        },
                        SendEmail: {
                            Type: 'Task',
                            Next: 'Send JobSync',
                            Parameters: {
                                FromEmailAddress: 'heb_order_workflow@styrk.io',
                                Destination: {
                                    ToAddresses: ['soporteMulticanal@hebmex.com', 'jquevedo@hebmex.com', 'liveopsecommerce@hebmex.com']
                                },
                                Content: {
                                    Simple: {
                                        Subject: {
                                            'Data.$': "States.Format('{} - La ventana de entrega ha cambiado.', $.orderId)"
                                        },
                                        Body: {
                                            Text: {
                                                'Data.$':
                                                    "States.Format('La orden {} ha cambiado de horario, favor de revisar con el cliente.\n {}', $.orderId, $.scheduleChange)"
                                            }
                                        }
                                    }
                                }
                            },
                            Resource: 'arn:aws:states:::aws-sdk:sesv2:sendEmail',
                            ResultPath: '$.Payload'
                        },
                        'No Timeslots': {
                            Type: 'Fail'
                        },
                        'Send JobSync': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            Parameters: {
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST',
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'jobSync',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    'order.$': '$.order',
                                    'availability.$': '$.availability'
                                }
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 6,
                                    BackoffRate: 2
                                }
                            ],
                            OutputPath: '$.Payload',
                            Next: 'Send Order Draft'
                        },
                        'Send Order Draft': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            OutputPath: '$.Payload',
                            Parameters: {
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST',
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'orderDraft',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    'order.$': '$.order',
                                    'availability.$': '$.availability',
                                    'jobSync.$': '$.jobSync'
                                }
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 6,
                                    BackoffRate: 2
                                }
                            ],
                            Next: 'Save All Data'
                        },
                        'Save All Data': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            OutputPath: '$.Payload',
                            Parameters: {
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST',
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'saveAllData',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    'order.$': '$.order',
                                    'availability.$': '$.availability',
                                    'jobSync.$': '$.jobSync',
                                    'orderDraft.$': '$.orderDraft'
                                }
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 6,
                                    BackoffRate: 2
                                }
                            ],
                            Next: 'Save Instaleap Data to MD'
                        },
                        'Save Instaleap Data to MD': {
                            Type: 'Task',
                            Resource: 'arn:aws:states:::lambda:invoke',
                            OutputPath: '$.Payload',
                            Parameters: {
                                FunctionName: 'arn:aws:lambda:us-east-1:673419510149:function:hebmx-order-workflow-create:$LATEST',
                                Payload: {
                                    workflowId: 'hebmx-order-creation',
                                    function: 'saveDocumentMD',
                                    'orderId.$': '$.orderId',
                                    bucket: 'hebmx-middleware-bucket',
                                    'order.$': '$.order',
                                    'availability.$': '$.availability',
                                    'jobSync.$': '$.jobSync',
                                    'orderDraft.$': '$.orderDraft'
                                }
                            },
                            Retry: [
                                {
                                    ErrorEquals: [
                                        'Lambda.ServiceException',
                                        'Lambda.AWSLambdaException',
                                        'Lambda.SdkClientException',
                                        'Lambda.TooManyRequestsException'
                                    ],
                                    IntervalSeconds: 2,
                                    MaxAttempts: 6,
                                    BackoffRate: 2
                                }
                            ],
                            End: true
                        }
                    }
                }
            ],
            End: true
        }
    }
};
