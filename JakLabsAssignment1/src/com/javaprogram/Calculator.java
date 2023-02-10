package com.javaprogram;

import java.util.Scanner;


public class Calculator {

	public static void main(String[] args) {
		
		int n1, n2;
		
		try {
			
			Scanner sc = new Scanner(System.in);
			System.out.println("Input 2 number:  ");
			
			n1 = sc.nextInt();
			n2 = sc.nextInt();
			
			System.out.println("Penambahan: " + (n1 + n2));
			System.out.println("Pengurangan: " + (n1 - n2));
			System.out.println("Perkalian: " + (n1 * n2));
			System.out.println("Pembagian: " + (n1 / n2));

	}
		catch (Exception e) {
			System.out.println("This is not number");
		}

	}
}

