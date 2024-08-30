"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAppStack = void 0;
const cdktf_1 = require("cdktf");
const provider_1 = require("@cdktf/provider-aws/lib/provider");
const backend_1 = require("./backend");
const docassemble_1 = require("./docassemble");
const rest_api_1 = require("./rest-api");
const registerAppStack = (stackPrefix) => {
    const app = new cdktf_1.App();
    const stack = new AppStack(app, stackPrefix);
    (0, backend_1.withBackend)(stack, stackPrefix);
    app.synth();
};
exports.registerAppStack = registerAppStack;
class AppStack extends cdktf_1.TerraformStack {
    constructor(scope, id) {
        super(scope, id);
        new provider_1.AwsProvider(this, 'AWS', {
            region: 'us-east-2',
        });
        new docassemble_1.Docassemble(this, `${id}-docassemble`);
        new rest_api_1.FormService(this, `${id}-rest-api`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE0QztBQUU1QywrREFBK0Q7QUFFL0QsdUNBQXdDO0FBQ3hDLCtDQUE0QztBQUM1Qyx5Q0FBeUM7QUFFbEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFdBQW1CLEVBQUUsRUFBRTtJQUN0RCxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQUcsRUFBRSxDQUFDO0lBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3QyxJQUFBLHFCQUFXLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNkLENBQUMsQ0FBQztBQUxXLFFBQUEsZ0JBQWdCLG9CQUszQjtBQUVGLE1BQU0sUUFBUyxTQUFRLHNCQUFjO0lBQ25DLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSxzQkFBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDM0IsTUFBTSxFQUFFLFdBQVc7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSx5QkFBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0MsSUFBSSxzQkFBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwLCBUZXJyYWZvcm1TdGFjayB9IGZyb20gJ2Nka3RmJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXdzUHJvdmlkZXIgfSBmcm9tICdAY2RrdGYvcHJvdmlkZXItYXdzL2xpYi9wcm92aWRlcic7XG5cbmltcG9ydCB7IHdpdGhCYWNrZW5kIH0gZnJvbSAnLi9iYWNrZW5kJztcbmltcG9ydCB7IERvY2Fzc2VtYmxlIH0gZnJvbSAnLi9kb2Nhc3NlbWJsZSc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4vcmVzdC1hcGknO1xuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJBcHBTdGFjayA9IChzdGFja1ByZWZpeDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXBwU3RhY2soYXBwLCBzdGFja1ByZWZpeCk7XG4gIHdpdGhCYWNrZW5kKHN0YWNrLCBzdGFja1ByZWZpeCk7XG4gIGFwcC5zeW50aCgpO1xufTtcblxuY2xhc3MgQXBwU3RhY2sgZXh0ZW5kcyBUZXJyYWZvcm1TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgbmV3IEF3c1Byb3ZpZGVyKHRoaXMsICdBV1MnLCB7XG4gICAgICByZWdpb246ICd1cy1lYXN0LTInLFxuICAgIH0pO1xuXG4gICAgbmV3IERvY2Fzc2VtYmxlKHRoaXMsIGAke2lkfS1kb2Nhc3NlbWJsZWApO1xuICAgIG5ldyBGb3JtU2VydmljZSh0aGlzLCBgJHtpZH0tcmVzdC1hcGlgKTtcbiAgfVxufVxuIl19