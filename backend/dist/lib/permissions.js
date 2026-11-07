import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc, memberAc, ownerAc } from 'better-auth/plugins/organization/access';
const statement = {
    ...defaultStatements,
    project: ["create"],
};
export const ac = createAccessControl(statement);
export const admin_role = ac.newRole({
    project: ["create"],
    ...adminAc.statements,
});
export const owner_role = ac.newRole({
    project: ["create"],
    ...ownerAc.statements,
});
export const custom_role = ac.newRole({
    project: ["create"],
    ...memberAc.statements,
});
