import { User } from "@modules/admin/modules/user/store/user";

export class UserGenerator {

  private famName = ['Mueller', 'Schulz', 'Heinz', 'Lehmann', 'Kunze', 'Scholz', 'Willmann', 'Bergmann'];
  private givenName = ['Klaus', 'Gabi', 'Susi', 'Erna', 'Mathilde', 'Henriette', 'Alex', 'Franz'];

  // randomUser(): User {
  //   const givenName = this.givenName[UserGenerator.randomInt(0, this.givenName.length - 1)];
  //   const lastName = this.famName[UserGenerator.randomInt(0, this.famName.length - 1)];
  //   const randomInt = UserGenerator.randomInt(100, 1000);
  //   const email = givenName + '@' + lastName + randomInt + '.de';
  //   const pw = givenName.charAt(0) + lastName.charAt(0) + randomInt;
  //   return {
  //     id: "",
  //     lastLogin: undefined,
  //     photoUrl: "",
  //     role: undefined,
  //     status: undefined,
  //     lastName: lastName,
  //     givenName: givenName,
  //     email: email,
  //     password: pw
  //   };
  // }

  private static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
