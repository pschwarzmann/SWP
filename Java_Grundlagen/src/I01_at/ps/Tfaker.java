package I01_at.ps;

import com.github.javafaker.Faker;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Locale;

public class Tfaker {
    public static void main(String[] args) {

        final Faker faker = new Faker(new Locale("de-AT"));

        generateFile("Insertdaten.txt", () -> 
            new String[]{
                faker.name().fullName(),
                faker.name().firstName(),
                faker.name().lastName(),
                faker.address().streetAddress()
            });

        generateFile("Insertdaten2.txt", () -> 
            new String[]{
                faker.funnyName().name(),
                faker.artist().name(),
                faker.app().name(),
                faker.code().ean8()
            });

        generateFile("Insertdaten3.txt", () -> 
            new String[]{
                faker.animal().name(),
                faker.beer().name(),
                faker.book().author(),
                faker.cat().name()
            });

        generateFile("Insertdaten4.txt", () -> 
            new String[]{
                faker.music().genre(),
                faker.zelda().character(),
                faker.dragonBall().character(),
                faker.superhero().name()
            });
    }

    private static void generateFile(String fileName, DataSupplier supplier) {
        try (FileWriter myWriter = new FileWriter(fileName)) {
            for (int i = 0; i < 100; i++) {
                String[] data = supplier.getData();
                myWriter.write("('" + String.join("','", data) + "')");
                if (i < 99) {
                    myWriter.write(",");
                }
                myWriter.write("\n");
            }
            System.out.println("Successfully wrote to " + fileName);
        } catch (IOException e) {
            System.out.println("An error occurred while writing to " + fileName);
            e.printStackTrace();
        }
    }

    @FunctionalInterface
    interface DataSupplier {
        String[] getData();
    }
}
