import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'name of user' })
  user_name: string;

  @Field(() => String, { description: 'url of user' })
  user_url: string;

  @Field(() => String, { description: 'link of the avatar img' })
  avatar_url?: string;
}
