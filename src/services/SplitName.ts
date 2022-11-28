const splitName = (name: string) => {
  const nameSplitted = name.split(" ");
  const lastName = nameSplitted[nameSplitted.length - 1];
  nameSplitted.splice(nameSplitted.length - 1);
  const firstName = nameSplitted.join(" ");

  return { firstName, lastName };
};
export default splitName;
