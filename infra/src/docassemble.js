"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docassemble = void 0;
const cdktf_1 = require("cdktf");
const constructs_1 = require("constructs");
const lightsail_instance_1 = require("@cdktf/provider-aws/lib/lightsail-instance");
const lightsail_static_ip_1 = require("@cdktf/provider-aws/lib/lightsail-static-ip");
const lightsail_instance_public_ports_1 = require("@cdktf/provider-aws/lib/lightsail-instance-public-ports");
const lightsail_static_ip_attachment_1 = require("@cdktf/provider-aws/lib/lightsail-static-ip-attachment");
class Docassemble extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const lightsailInstance = new lightsail_instance_1.LightsailInstance(this, 'docassemble_lightsail', {
            name: id,
            availabilityZone: 'us-east-2a',
            blueprintId: 'amazon_linux_2',
            bundleId: 'medium_2_0',
            // Preliminary logic to spin up a configured docassemble instance:
            userData: USER_DATA_COMMAND,
        });
        const staticIp = new lightsail_static_ip_1.LightsailStaticIp(this, 'docassemble_lightsail_static_ip', {
            name: `${id}-static-ip`,
        });
        new lightsail_static_ip_attachment_1.LightsailStaticIpAttachment(this, 'test_2', {
            instanceName: lightsailInstance.id,
            staticIpName: staticIp.name,
        });
        new lightsail_instance_public_ports_1.LightsailInstancePublicPorts(this, `docassemble_lightsail_public_ports`, {
            instanceName: lightsailInstance.name,
            portInfo: [
                {
                    fromPort: 80,
                    protocol: 'tcp',
                    toPort: 80,
                },
                {
                    fromPort: 443,
                    protocol: 'tcp',
                    toPort: 443,
                },
                {
                    fromPort: 22,
                    protocol: 'tcp',
                    toPort: 22,
                },
            ],
        });
        new cdktf_1.TerraformOutput(this, 'docassemble_ip_address', {
            value: staticIp.ipAddress,
        });
    }
}
exports.Docassemble = Docassemble;
const USER_DATA_COMMAND = `
sudo yum -y update && \
sudo yum -y install docker && \
sudo systemctl enable docker && \
sudo systemctl start docker && \
sudo usermod -a -G docker ec2-user && \
echo "DAHOSTNAME=docassemble.atj.10x.gov
TIMEZONE=America/New_York
USEHTTPS=true
USELETSENCRYPT=true
LETSENCRYPTEMAIL=daniel.naab@gsa.gov" > /home/ec2-user/env.list && \
sudo chown ec2-user:ec2-user /home/ec2-user/env.list && \
sudo docker run -d \
  --env-file /home/ec2-user/env.list \
  --volume dabackup:/usr/share/docassemble/backup \
  --publish 80:80 \
  --publish 443:443 \
  --stop-timeout 600 \
  jhpyle/docassemble
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYXNzZW1ibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2Nhc3NlbWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBd0M7QUFDeEMsMkNBQXVDO0FBRXZDLG1GQUErRTtBQUMvRSxxRkFBZ0Y7QUFDaEYsNkdBQXVHO0FBQ3ZHLDJHQUFxRztBQUVyRyxNQUFhLFdBQVksU0FBUSxzQkFBUztJQUN4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxzQ0FBaUIsQ0FDN0MsSUFBSSxFQUNKLHVCQUF1QixFQUN2QjtZQUNFLElBQUksRUFBRSxFQUFFO1lBQ1IsZ0JBQWdCLEVBQUUsWUFBWTtZQUM5QixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLGtFQUFrRTtZQUNsRSxRQUFRLEVBQUUsaUJBQWlCO1NBQzVCLENBQ0YsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksdUNBQWlCLENBQ3BDLElBQUksRUFDSixpQ0FBaUMsRUFDakM7WUFDRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVk7U0FDeEIsQ0FDRixDQUFDO1FBQ0YsSUFBSSw0REFBMkIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQzlDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxFQUFFO1lBQ2xDLFlBQVksRUFBRSxRQUFRLENBQUMsSUFBSTtTQUM1QixDQUFDLENBQUM7UUFDSCxJQUFJLDhEQUE0QixDQUM5QixJQUFJLEVBQ0osb0NBQW9DLEVBQ3BDO1lBQ0UsWUFBWSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDcEMsUUFBUSxFQUFFO2dCQUNSO29CQUNFLFFBQVEsRUFBRSxFQUFFO29CQUNaLFFBQVEsRUFBRSxLQUFLO29CQUNmLE1BQU0sRUFBRSxFQUFFO2lCQUNYO2dCQUNEO29CQUNFLFFBQVEsRUFBRSxHQUFHO29CQUNiLFFBQVEsRUFBRSxLQUFLO29CQUNmLE1BQU0sRUFBRSxHQUFHO2lCQUNaO2dCQUNEO29CQUNFLFFBQVEsRUFBRSxFQUFFO29CQUNaLFFBQVEsRUFBRSxLQUFLO29CQUNmLE1BQU0sRUFBRSxFQUFFO2lCQUNYO2FBQ0Y7U0FDRixDQUNGLENBQUM7UUFFRixJQUFJLHVCQUFlLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ2xELEtBQUssRUFBRSxRQUFRLENBQUMsU0FBUztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF2REQsa0NBdURDO0FBRUQsTUFBTSxpQkFBaUIsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1CekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlcnJhZm9ybU91dHB1dCB9IGZyb20gJ2Nka3RmJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5pbXBvcnQgeyBMaWdodHNhaWxJbnN0YW5jZSB9IGZyb20gJ0BjZGt0Zi9wcm92aWRlci1hd3MvbGliL2xpZ2h0c2FpbC1pbnN0YW5jZSc7XG5pbXBvcnQgeyBMaWdodHNhaWxTdGF0aWNJcCB9IGZyb20gJ0BjZGt0Zi9wcm92aWRlci1hd3MvbGliL2xpZ2h0c2FpbC1zdGF0aWMtaXAnO1xuaW1wb3J0IHsgTGlnaHRzYWlsSW5zdGFuY2VQdWJsaWNQb3J0cyB9IGZyb20gJ0BjZGt0Zi9wcm92aWRlci1hd3MvbGliL2xpZ2h0c2FpbC1pbnN0YW5jZS1wdWJsaWMtcG9ydHMnO1xuaW1wb3J0IHsgTGlnaHRzYWlsU3RhdGljSXBBdHRhY2htZW50IH0gZnJvbSAnQGNka3RmL3Byb3ZpZGVyLWF3cy9saWIvbGlnaHRzYWlsLXN0YXRpYy1pcC1hdHRhY2htZW50JztcblxuZXhwb3J0IGNsYXNzIERvY2Fzc2VtYmxlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3QgbGlnaHRzYWlsSW5zdGFuY2UgPSBuZXcgTGlnaHRzYWlsSW5zdGFuY2UoXG4gICAgICB0aGlzLFxuICAgICAgJ2RvY2Fzc2VtYmxlX2xpZ2h0c2FpbCcsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IGlkLFxuICAgICAgICBhdmFpbGFiaWxpdHlab25lOiAndXMtZWFzdC0yYScsXG4gICAgICAgIGJsdWVwcmludElkOiAnYW1hem9uX2xpbnV4XzInLFxuICAgICAgICBidW5kbGVJZDogJ21lZGl1bV8yXzAnLFxuICAgICAgICAvLyBQcmVsaW1pbmFyeSBsb2dpYyB0byBzcGluIHVwIGEgY29uZmlndXJlZCBkb2Nhc3NlbWJsZSBpbnN0YW5jZTpcbiAgICAgICAgdXNlckRhdGE6IFVTRVJfREFUQV9DT01NQU5ELFxuICAgICAgfVxuICAgICk7XG4gICAgY29uc3Qgc3RhdGljSXAgPSBuZXcgTGlnaHRzYWlsU3RhdGljSXAoXG4gICAgICB0aGlzLFxuICAgICAgJ2RvY2Fzc2VtYmxlX2xpZ2h0c2FpbF9zdGF0aWNfaXAnLFxuICAgICAge1xuICAgICAgICBuYW1lOiBgJHtpZH0tc3RhdGljLWlwYCxcbiAgICAgIH1cbiAgICApO1xuICAgIG5ldyBMaWdodHNhaWxTdGF0aWNJcEF0dGFjaG1lbnQodGhpcywgJ3Rlc3RfMicsIHtcbiAgICAgIGluc3RhbmNlTmFtZTogbGlnaHRzYWlsSW5zdGFuY2UuaWQsXG4gICAgICBzdGF0aWNJcE5hbWU6IHN0YXRpY0lwLm5hbWUsXG4gICAgfSk7XG4gICAgbmV3IExpZ2h0c2FpbEluc3RhbmNlUHVibGljUG9ydHMoXG4gICAgICB0aGlzLFxuICAgICAgYGRvY2Fzc2VtYmxlX2xpZ2h0c2FpbF9wdWJsaWNfcG9ydHNgLFxuICAgICAge1xuICAgICAgICBpbnN0YW5jZU5hbWU6IGxpZ2h0c2FpbEluc3RhbmNlLm5hbWUsXG4gICAgICAgIHBvcnRJbmZvOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbVBvcnQ6IDgwLFxuICAgICAgICAgICAgcHJvdG9jb2w6ICd0Y3AnLFxuICAgICAgICAgICAgdG9Qb3J0OiA4MCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb21Qb3J0OiA0NDMsXG4gICAgICAgICAgICBwcm90b2NvbDogJ3RjcCcsXG4gICAgICAgICAgICB0b1BvcnQ6IDQ0MyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb21Qb3J0OiAyMixcbiAgICAgICAgICAgIHByb3RvY29sOiAndGNwJyxcbiAgICAgICAgICAgIHRvUG9ydDogMjIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbmV3IFRlcnJhZm9ybU91dHB1dCh0aGlzLCAnZG9jYXNzZW1ibGVfaXBfYWRkcmVzcycsIHtcbiAgICAgIHZhbHVlOiBzdGF0aWNJcC5pcEFkZHJlc3MsXG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgVVNFUl9EQVRBX0NPTU1BTkQgPSBgXG5zdWRvIHl1bSAteSB1cGRhdGUgJiYgXFxcbnN1ZG8geXVtIC15IGluc3RhbGwgZG9ja2VyICYmIFxcXG5zdWRvIHN5c3RlbWN0bCBlbmFibGUgZG9ja2VyICYmIFxcXG5zdWRvIHN5c3RlbWN0bCBzdGFydCBkb2NrZXIgJiYgXFxcbnN1ZG8gdXNlcm1vZCAtYSAtRyBkb2NrZXIgZWMyLXVzZXIgJiYgXFxcbmVjaG8gXCJEQUhPU1ROQU1FPWRvY2Fzc2VtYmxlLmF0ai4xMHguZ292XG5USU1FWk9ORT1BbWVyaWNhL05ld19Zb3JrXG5VU0VIVFRQUz10cnVlXG5VU0VMRVRTRU5DUllQVD10cnVlXG5MRVRTRU5DUllQVEVNQUlMPWRhbmllbC5uYWFiQGdzYS5nb3ZcIiA+IC9ob21lL2VjMi11c2VyL2Vudi5saXN0ICYmIFxcXG5zdWRvIGNob3duIGVjMi11c2VyOmVjMi11c2VyIC9ob21lL2VjMi11c2VyL2Vudi5saXN0ICYmIFxcXG5zdWRvIGRvY2tlciBydW4gLWQgXFxcbiAgLS1lbnYtZmlsZSAvaG9tZS9lYzItdXNlci9lbnYubGlzdCBcXFxuICAtLXZvbHVtZSBkYWJhY2t1cDovdXNyL3NoYXJlL2RvY2Fzc2VtYmxlL2JhY2t1cCBcXFxuICAtLXB1Ymxpc2ggODA6ODAgXFxcbiAgLS1wdWJsaXNoIDQ0Mzo0NDMgXFxcbiAgLS1zdG9wLXRpbWVvdXQgNjAwIFxcXG4gIGpocHlsZS9kb2Nhc3NlbWJsZVxuYDtcbiJdfQ==