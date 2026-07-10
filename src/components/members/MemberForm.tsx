async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();


  // Validation

  if (form.full_name.trim() === "") {
    alert("Full Name is required.");
    return;
  }


  if (form.mobile.trim().length !== 10) {
    alert("Enter valid mobile number.");
    return;
  }


  if (
    form.aadhaar.trim() !== "" &&
    form.aadhaar.trim().length !== 12
  ) {
    alert("Enter valid Aadhaar number.");
    return;
  }


  try {

    setLoading(true);


    if (editMode && initialData) {

      await updateMember(
        Number(initialData.id),
        form
      );


      alert(
        "Member updated successfully."
      );


    } else {


      await addMember(form);


      alert(
        "Member added successfully."
      );


      const nextId =
        await getNextMemberId();


      setForm({
        member_id: nextId,
        full_name: "",
        father_name: "",
        mobile: "",
        aadhaar: "",
        email: "",
        gender: "Male",
        dob: "",
        blood_group: "",
        studio_name: "",
        address: "",
        join_date: "",
        photo: "",
        role: "Member",
        status: "Active",
      });

    }


    onSaved?.();


  } catch(error) {


    console.error(error);


    alert(
      "Operation failed."
    );


  } finally {


    setLoading(false);


  }
}
