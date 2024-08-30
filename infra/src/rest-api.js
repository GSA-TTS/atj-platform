"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const path = require("path");
const cdktf_1 = require("cdktf");
const constructs_1 = require("constructs");
const aws = require("@cdktf/provider-aws");
class FormService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const config = {
            path: '../../apps/rest-api/dist',
            handler: 'index.lambdaHandler',
            runtime: 'nodejs18.x',
        };
        const asset = new cdktf_1.TerraformAsset(this, 'lambda-asset', {
            path: path.resolve(__dirname, config.path),
            type: cdktf_1.AssetType.ARCHIVE,
        });
        const role = new aws.iamRole.IamRole(this, 'lambda-role', {
            name: `${id}-lambda-function-role`,
            assumeRolePolicy: JSON.stringify({
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'sts:AssumeRole',
                        Principal: {
                            Service: 'lambda.amazonaws.com',
                        },
                        Effect: 'Allow',
                        Sid: '',
                    },
                ],
            }),
        });
        new aws.iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'lambda-managed-policy', {
            policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            role: role.name,
        });
        const lambdaFunc = new aws.lambdaFunction.LambdaFunction(this, 'lambda-function', {
            functionName: `${id}-lambda-function`,
            handler: config.handler,
            runtime: config.runtime,
            role: role.arn,
            filename: asset.path,
            sourceCodeHash: asset.assetHash,
        });
        const api = new aws.apigatewayv2Api.Apigatewayv2Api(this, 'api-gateway', {
            name: `${id}-api-gateway`,
            protocolType: 'HTTP',
            target: lambdaFunc.arn,
        });
        new aws.lambdaPermission.LambdaPermission(this, 'apigw-lambda', {
            functionName: lambdaFunc.functionName,
            action: 'lambda:InvokeFunction',
            principal: 'apigateway.amazonaws.com',
            sourceArn: `${api.executionArn}/*/*`,
        });
        this.url = api.apiEndpoint;
        new cdktf_1.TerraformOutput(this, 'url', {
            value: api.apiEndpoint,
        });
    }
}
exports.FormService = FormService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN0LWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFFN0IsaUNBQW1FO0FBQ25FLDJDQUF1QztBQUN2QywyQ0FBMkM7QUFFM0MsTUFBYSxXQUFZLFNBQVEsc0JBQVM7SUFHeEMsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLE1BQU0sR0FBRztZQUNiLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixPQUFPLEVBQUUsWUFBWTtTQUN0QixDQUFDO1FBRUYsTUFBTSxLQUFLLEdBQUcsSUFBSSxzQkFBYyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDckQsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDMUMsSUFBSSxFQUFFLGlCQUFTLENBQUMsT0FBTztTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDeEQsSUFBSSxFQUFFLEdBQUcsRUFBRSx1QkFBdUI7WUFDbEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDL0IsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxNQUFNLEVBQUUsZ0JBQWdCO3dCQUN4QixTQUFTLEVBQUU7NEJBQ1QsT0FBTyxFQUFFLHNCQUFzQjt5QkFDaEM7d0JBQ0QsTUFBTSxFQUFFLE9BQU87d0JBQ2YsR0FBRyxFQUFFLEVBQUU7cUJBQ1I7aUJBQ0Y7YUFDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsdUJBQXVCLENBQUMsdUJBQXVCLENBQ3JELElBQUksRUFDSix1QkFBdUIsRUFDdkI7WUFDRSxTQUFTLEVBQ1Asa0VBQWtFO1lBQ3BFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNoQixDQUNGLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUN0RCxJQUFJLEVBQ0osaUJBQWlCLEVBQ2pCO1lBQ0UsWUFBWSxFQUFFLEdBQUcsRUFBRSxrQkFBa0I7WUFDckMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDZCxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDcEIsY0FBYyxFQUFFLEtBQUssQ0FBQyxTQUFTO1NBQ2hDLENBQ0YsQ0FBQztRQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN2RSxJQUFJLEVBQUUsR0FBRyxFQUFFLGNBQWM7WUFDekIsWUFBWSxFQUFFLE1BQU07WUFDcEIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHO1NBQ3ZCLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDOUQsWUFBWSxFQUFFLFVBQVUsQ0FBQyxZQUFZO1lBQ3JDLE1BQU0sRUFBRSx1QkFBdUI7WUFDL0IsU0FBUyxFQUFFLDBCQUEwQjtZQUNyQyxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsWUFBWSxNQUFNO1NBQ3JDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUMzQixJQUFJLHVCQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUMvQixLQUFLLEVBQUUsR0FBRyxDQUFDLFdBQVc7U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBM0VELGtDQTJFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IEFzc2V0VHlwZSwgVGVycmFmb3JtQXNzZXQsIFRlcnJhZm9ybU91dHB1dCB9IGZyb20gJ2Nka3RmJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgYXdzIGZyb20gJ0BjZGt0Zi9wcm92aWRlci1hd3MnO1xuXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2UgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICByZWFkb25seSB1cmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIHBhdGg6ICcuLi8uLi9hcHBzL3Jlc3QtYXBpL2Rpc3QnLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmxhbWJkYUhhbmRsZXInLFxuICAgICAgcnVudGltZTogJ25vZGVqczE4LngnLFxuICAgIH07XG5cbiAgICBjb25zdCBhc3NldCA9IG5ldyBUZXJyYWZvcm1Bc3NldCh0aGlzLCAnbGFtYmRhLWFzc2V0Jywge1xuICAgICAgcGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgY29uZmlnLnBhdGgpLFxuICAgICAgdHlwZTogQXNzZXRUeXBlLkFSQ0hJVkUsXG4gICAgfSk7XG5cbiAgICBjb25zdCByb2xlID0gbmV3IGF3cy5pYW1Sb2xlLklhbVJvbGUodGhpcywgJ2xhbWJkYS1yb2xlJywge1xuICAgICAgbmFtZTogYCR7aWR9LWxhbWJkYS1mdW5jdGlvbi1yb2xlYCxcbiAgICAgIGFzc3VtZVJvbGVQb2xpY3k6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgVmVyc2lvbjogJzIwMTItMTAtMTcnLFxuICAgICAgICBTdGF0ZW1lbnQ6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBBY3Rpb246ICdzdHM6QXNzdW1lUm9sZScsXG4gICAgICAgICAgICBQcmluY2lwYWw6IHtcbiAgICAgICAgICAgICAgU2VydmljZTogJ2xhbWJkYS5hbWF6b25hd3MuY29tJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFZmZlY3Q6ICdBbGxvdycsXG4gICAgICAgICAgICBTaWQ6ICcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIG5ldyBhd3MuaWFtUm9sZVBvbGljeUF0dGFjaG1lbnQuSWFtUm9sZVBvbGljeUF0dGFjaG1lbnQoXG4gICAgICB0aGlzLFxuICAgICAgJ2xhbWJkYS1tYW5hZ2VkLXBvbGljeScsXG4gICAgICB7XG4gICAgICAgIHBvbGljeUFybjpcbiAgICAgICAgICAnYXJuOmF3czppYW06OmF3czpwb2xpY3kvc2VydmljZS1yb2xlL0FXU0xhbWJkYUJhc2ljRXhlY3V0aW9uUm9sZScsXG4gICAgICAgIHJvbGU6IHJvbGUubmFtZSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgbGFtYmRhRnVuYyA9IG5ldyBhd3MubGFtYmRhRnVuY3Rpb24uTGFtYmRhRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ2xhbWJkYS1mdW5jdGlvbicsXG4gICAgICB7XG4gICAgICAgIGZ1bmN0aW9uTmFtZTogYCR7aWR9LWxhbWJkYS1mdW5jdGlvbmAsXG4gICAgICAgIGhhbmRsZXI6IGNvbmZpZy5oYW5kbGVyLFxuICAgICAgICBydW50aW1lOiBjb25maWcucnVudGltZSxcbiAgICAgICAgcm9sZTogcm9sZS5hcm4sXG4gICAgICAgIGZpbGVuYW1lOiBhc3NldC5wYXRoLFxuICAgICAgICBzb3VyY2VDb2RlSGFzaDogYXNzZXQuYXNzZXRIYXNoLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgYXdzLmFwaWdhdGV3YXl2MkFwaS5BcGlnYXRld2F5djJBcGkodGhpcywgJ2FwaS1nYXRld2F5Jywge1xuICAgICAgbmFtZTogYCR7aWR9LWFwaS1nYXRld2F5YCxcbiAgICAgIHByb3RvY29sVHlwZTogJ0hUVFAnLFxuICAgICAgdGFyZ2V0OiBsYW1iZGFGdW5jLmFybixcbiAgICB9KTtcblxuICAgIG5ldyBhd3MubGFtYmRhUGVybWlzc2lvbi5MYW1iZGFQZXJtaXNzaW9uKHRoaXMsICdhcGlndy1sYW1iZGEnLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6IGxhbWJkYUZ1bmMuZnVuY3Rpb25OYW1lLFxuICAgICAgYWN0aW9uOiAnbGFtYmRhOkludm9rZUZ1bmN0aW9uJyxcbiAgICAgIHByaW5jaXBhbDogJ2FwaWdhdGV3YXkuYW1hem9uYXdzLmNvbScsXG4gICAgICBzb3VyY2VBcm46IGAke2FwaS5leGVjdXRpb25Bcm59LyovKmAsXG4gICAgfSk7XG5cbiAgICB0aGlzLnVybCA9IGFwaS5hcGlFbmRwb2ludDtcbiAgICBuZXcgVGVycmFmb3JtT3V0cHV0KHRoaXMsICd1cmwnLCB7XG4gICAgICB2YWx1ZTogYXBpLmFwaUVuZHBvaW50LFxuICAgIH0pO1xuICB9XG59XG4iXX0=