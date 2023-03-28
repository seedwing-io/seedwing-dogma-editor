import { AstNode, DefaultScopeProvider, LangiumServices, ReferenceInfo, Scope } from "langium";
import { isLocalPatternReference, isPattern } from "./generated/ast";

export class SeedwingDogmaScopeProvider extends DefaultScopeProvider {

    constructor(services: LangiumServices) {
        super(services);
    }

    override getScope(context: ReferenceInfo): Scope {

        {
            const scope = this.isTypeArgument(context.container);
            if (scope !== undefined) {
                return scope;
            }
        }

        return super.getScope(context);
    }

    private isTypeArgument(node: AstNode): Scope | undefined {

        if (!isLocalPatternReference(node)) {
            return undefined;
        }

        let name = node.ref.$refText;

        let current: AstNode | undefined = node;
        while (current !== undefined) {
            if (isPattern(current)) {
                if (current.arguments) {
                    if (current.arguments?.arguments.findIndex((i) => i.name === name) >= 0) {
                        return this.createScopeForNodes(current.arguments.arguments);
                    }
                }
            }
            current = current.$container;
        }

        return undefined;
    }

}